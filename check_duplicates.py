import json
import re

def check_duplicates(file_path):
    try:
        with open(file_path, 'r') as f:
            content = f.read()
    except Exception as e:
        print(f"Error reading file: {e}")
        return
    
    # Simplified extraction of image paths using regex
    image_paths = re.findall(r'image:\s*"(.*?)"', content)
    
    unique_images = {}
    for path in image_paths:
        if path in unique_images:
            unique_images[path] += 1
        else:
            unique_images[path] = 1
    
    print("\n📦 Image Repetition Report")
    print("==========================")
    duplicates = {k: v for k, v in unique_images.items() if v > 1}
    if not duplicates:
        print("✅ All products have unique images!")
    else:
        for path, count in sorted(duplicates.items(), key=lambda x: x[1], reverse=True):
            print(f"- {count} products share: {path}")
    print("==========================\n")

if __name__ == "__main__":
    check_duplicates('src/scripts/product-data.js')
