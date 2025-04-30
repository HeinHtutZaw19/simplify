import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin
import json
import time

BASE_URL = "https://cosbar.com"
COLLECTIONS_PATH = "/collections/"

def get_collection_handles():
    """Fetch /collections/ and return a list of collection handles (last path segment)."""
    resp = requests.get(urljoin(BASE_URL, COLLECTIONS_PATH))
    resp.raise_for_status()
    soup = BeautifulSoup(resp.text, "html.parser")

    handles = set()
    # select all <a href="/collections/xyz" …>
    for a in soup.select('a.collection-item[href^="/collections/"]'):
        href = a["href"].split("?")[0]  # strip any query params
        parts = href.rstrip("/").split("/")
        if len(parts) == 3:  # ['', 'collections', 'handle']
            handles.add(parts[-1])
    return list(handles)


def get_products_for_collection(handle):
    """Paginate through a single collection and return its full product URLs."""
    product_urls = set()
    page = 1

    while True:
        url = f"{BASE_URL}/collections/{handle}?page={page}"
        print(f"Fetching {url}")

        try:
            resp = requests.get(url, timeout=10)
            resp.raise_for_status()
        except (requests.exceptions.RequestException) as e:
            print(f"  ! Error fetching page {page} of collection '{handle}': {e}")
            print("  ! Skipping to next collection.")
            break  # Stop trying pages for this collection

        soup = BeautifulSoup(resp.text, "html.parser")

        # find product links within this page
        anchors = soup.select('a.grid-product__link[href*="/products/"]')
        if not anchors:
            print(f"No more products found on page {page}.")
            break

        for a in anchors:
            href = a["href"].split("?")[0]
            full_url = urljoin(BASE_URL, href)
            product_urls.add(full_url)

        print(f"  • [{handle}] page {page}: {len(anchors)} products")
        page += 1
        time.sleep(0.3)

    return product_urls



def main():
    all_products = set()

    print("Fetching collection handles…")
    handles = get_collection_handles()
    print(f"Found {len(handles)} collections: {handles}")

    for handle in handles:
        print(f"Scraping products from collection: {handle}")
        urls = get_products_for_collection(handle)
        all_products.update(urls)

    print(f"\nTotal unique products found: {len(all_products)}")

    # Export to JSON
    with open("products.json", "w") as f:
        json.dump(sorted(all_products), f, indent=2)
    print("Saved all product URLs to products.json")

if __name__ == "__main__":
    main()


    
#    with open("items.json", "r") as f:
#         products = json.load(f)  # Parse the JSON file into a Python list

#         # Filter out items where "description" is an empty list
#         filtered_products = [product for product in products if product.get("description")]

#         # Overwrite the items.json file with the updated content
#         with open("items.json", "w") as f:
#             json.dump(filtered_products, f, indent=4)
