from github import Github
import requests
import os

# Replace with your GitHub username and personal access token
github_username = "valiantlynx"
github_token = "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"

# List of GitHub repository URLs to archive
repo_urls = [
    "https://github.com/valiantlynx/React-Components",
    "https://github.com/valiantlynx/React-Styling-Practice",
    # Add more repository URLs as needed
]

# Replace these with your own values
source_repo = 'minfuel/minfuel-svelte'
target_repo = 'minfuel/minfuel-turborepo'
access_token = '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'

class GitHub:
    def __init__(self, repo_url, access_token, issue=None):
        self.repo_url = repo_url
        self.access_token = access_token
        self.issue = issue
        
    # Function to get all issues from the source repository
    def get_issues(self):
        url = f'{self.repo_url}/issues?state=all'  # Include all issues (open and closed)
        headers = {
            'Authorization': f'token {access_token}'
        }
        response = requests.get(url, headers=headers)
        return response.json()

    # Function to create an issue in the target repository
    def create_issue(self):
        url = f'{self.repo_url}/issues'
        headers = {
            'Authorization': f'token {access_token}'
        }
        response = requests.post(url, headers=headers, json=self.issue)
        return response.json()
    
    
    def get_repo(self):
        # Extract the repository name from the URL
        repo_name = repo_url.split("/")[-1]

        # Clone the repository to the current folder
        os.system(f"git clone {repo_url}")


# Clone and delete repositories
for repo_url in repo_urls:
            
    # Create a GitHub instance
    g = Github(github_username, github_token)

    # Extract the repository name from the URL
    repo_name = repo_url.split("/")[-1]

    # Clone the repository to the current folder
    os.system(f"git clone {repo_url}")

    # Get the user or organization
    user = g.get_user(github_username)
    print(f"USER '{user}' ...")
    
    try:
        # Get the repository
        repo = user.get_repo(repo_name)
        
        # Delete the repository
        repo.delete()
        print(f"Repository '{repo_name}' has been deleted from GitHub.")
    except Exception as e:
        print(f"Failed to delete repository '{repo_name}': {e}")

print("All operations completed.")
