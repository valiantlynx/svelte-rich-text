import markdown
import html2text
from bs4 import BeautifulSoup

def markdown_to_rich_text(md_text):
    # Convert Markdown to HTML
    html_text = markdown.markdown(md_text)

    # Convert HTML to plain text using html2text
    plain_text = html2text.html2text(html_text)

    # Create a rich text representation
    rich_text = []

    # Split the plain text into lines
    lines = plain_text.split('\n')

    for line in lines:
        if line.strip():
            rich_text.append({
                'text': line.strip(),
                'bold': False,
                'italic': False,
                'underline': False,
                'color': None,
                'size': None,
            })

    # Optionally, you can parse the HTML for more formatting details
    soup = BeautifulSoup(html_text, 'html.parser')
    # Add code to extract more formatting information from the HTML if needed

    return rich_text

# Example usage
md_text = """
# Heading
This is *italic* and **bold** text.

- List item 1
- List item 2

[Link](https://www.example.com)
"""

rich_text = markdown_to_rich_text(md_text)

for item in rich_text:
    print(item)
