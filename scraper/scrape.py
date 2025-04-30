from apify_client import ApifyClient
from dotenv import load_dotenv
import os
import json

# Load .env into os.environ
load_dotenv()

# Read your Apify API token
APIFY_KEY = os.getenv("APIFY_KEY")

# Initialize the ApifyClient with the token
client = ApifyClient(APIFY_KEY)

# Prepare the Actor input
f = open("products.txt", "r")

run_input = { "urls":f.read()}
# Run the Actor and wait for it to finish
run = client.actor("paRwK1eUa0RPCDgnS").call(run_input=run_input)


all_items = []

for item in client.dataset(run["defaultDatasetId"]).iterate_items():
    if(item.get("description")):
        all_items.append(item)

# Save all collected items to a JSON file
with open('items.json', 'w') as f:
    json.dump(all_items, f, indent=4)