import os
from markdown_handler import MarkdownToHTMLConverter
from pocketbase import PocketBase
from pocketbase.client import FileUpload

# Define the input and output directories
input_dir = "md-content"  # Adjust this to your directory structure
output_dir = "html-content"  # Directory to save generated HTML files

# Create the output directory if it doesn't exist
if not os.path.exists(output_dir):
    os.makedirs(output_dir)

# Initialize the Markdown to HTML converter
converter = MarkdownToHTMLConverter()

# Initialize PocketBase client with your server URL
client = PocketBase('https://animevariant.fly.dev')

# Authenticate as an admin or user (replace with your actual credentials)
admin_data = client.admins.auth_with_password("valiantlynxz@gmail.com", "pineapple123")

# Loop through the directories in the input directory
for dirpath, dirnames, filenames in os.walk(input_dir):
    for dirname in dirnames:
        blog_slug = dirname
        blog_dir = os.path.join(input_dir, blog_slug)

        # Initialize an HTML file for this blog
        html_file = os.path.join(output_dir, f"{blog_slug}.html")

        # Initialize an empty Markdown content
        md_text = ""

        # Loop through Markdown files in the blog directory
        for root, _, files in os.walk(blog_dir):
            for filename in files:
                if filename.endswith(".md"):
                    file_path = os.path.join(root, filename)
                    with open(file_path, "r", encoding="utf-8") as file:
                        md_text += file.read()

        # Convert the combined Markdown content to HTML
        metadata, html_text = converter.markdown_to_html(md_text)

        # # Write the generated HTML content to the output HTML file
        # with open(html_file, "w", encoding="utf-8") as html_file:
        #     html_file.write(html_text)

        print(f"Generated HTML file: {html_file}")
        print(f"Metadata: {metadata}")
        # Create a record in the PocketBase collection with the HTML content and metadata
        record_data = {
            "content": html_text,
            "slug": blog_slug,
        }

        if "title" in metadata:
            record_data["title"] = metadata["title"]

        if "summary" in metadata:
            record_data["summary"] = metadata["summary"]

        if "created" in metadata:
            record_data["created"] = metadata["created"]

        if "updated" in metadata:
            record_data["updated"] = metadata["updated"]

        if "alt" in metadata:
            record_data["alt"] = metadata["alt"]

        if "tag" in metadata:
            record_data["tag"] = metadata["tag"]

        # Create the record in the "blogs" collection on PocketBase
        result = client.collection("blogs").create(record_data)

