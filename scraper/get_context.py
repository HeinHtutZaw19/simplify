import os
import json
from dotenv import load_dotenv
from langchain.llms import OpenAI
from langchain.prompts import PromptTemplate
from langchain.chains import LLMChain

category_list = ["skincare", "men&#39;s"]

def main():
    # Load environment variables
    load_dotenv("../.env")
    api_key = os.getenv("OPENAI_API_KEY")
    if not api_key:
        raise ValueError("OPENAI_API_KEY not found in environment variables")

    # Initialize OpenAI LLM via LangChain
    llm = OpenAI(temperature=0.3, max_tokens=400, openai_api_key=api_key)

    # Load products from JSON file
    json_path = "../resources/items.json"
    with open(json_path, "r", encoding="utf-8") as f:
        products = json.load(f)

    # Prompt template for each product
    template = (
        "For the product **{name}** from the brand **{brand}**, please provide a detailed paragraph describing: "
        "1) **Who** should use this product (including details like age group, skin type, hair type, or other relevant demographics), "
        "2) **How** to use the product effectively, and "
        "3) **Why** this product from **{brand}** is beneficial. "
        "Make sure to refer to **{name}** and **{brand}** by name each time you mention the product, instead of using generic phrases like 'this product'."
        "Be as specific as possible, narrowing the description to precise user types and use cases for **{name}** and **{brand}**."
    )
    prompt = PromptTemplate(input_variables=["name", "brand"], template=template)
    chain = LLMChain(llm=llm, prompt=prompt)

    # Accumulate responses
    combined_output = []
    for prod in products:
        name = prod.get("name")
        brand = prod.get("brand")
        if not prod.get("product_image"):
            print(f"Product {name} has no image URL.")
            continue
        image_url = prod.get("product_image")[0]
        price = prod.get("price")
        category = prod.get("category")
        print(category.lower())
        if not name or not brand or (category.lower() not in category_list):
            continue
        response = chain.run({"name": name, "brand": brand, "image_url": image_url, "price": price})
        image_price = " {name} and {brand}'s image is {image_url} and {name} and {brand}'s price is ${price} at the end. \n" 
        header = f"=== {name} ({brand}) ==="
        combined_output.append(header)
        combined_output.append(response)
        combined_output.append(image_price.format(name=name, brand=brand, image_url=image_url, price=price))
        combined_output.append("\n")
        print(header, response+image_price.format(name=name, brand=brand, image_url=image_url, price=price))

    # Write to info.txt
    output_text = "\n".join(combined_output)
    with open("../resources/filtered_info.txt", "a", encoding="utf-8") as out_file:
        out_file.write(output_text)

    print("Generated info.txt with product usage details.")

if __name__ == "__main__":
    main()
