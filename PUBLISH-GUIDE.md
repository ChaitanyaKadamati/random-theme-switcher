# VS Code Marketplace Publication Guide

## Step 1: Create a Publisher Account

1. **Visit the Visual Studio Marketplace Management Portal**:
   - Go to: https://marketplace.visualstudio.com/manage

2. **Sign in with Microsoft Account**:
   - Use your Microsoft/Azure DevOps account
   - If you don't have one, create it at: https://dev.azure.com

3. **Create a Publisher**:
   - Click "Create publisher"
   - Choose a unique publisher ID (this will replace "your-publisher-name" in package.json)
   - Fill in display name and description
   - This publisher ID must match exactly what's in your package.json

## Step 2: Get Personal Access Token (PAT)

1. **Go to Azure DevOps**:
   - Visit: https://dev.azure.com
   - Sign in with the same account

2. **Create Personal Access Token**:
   - Click on your profile icon → "Personal access tokens"
   - Click "New Token"
   - Name: "VS Code Extension Publishing"
   - Organization: "All accessible organizations"
   - Expiration: Set as needed (recommend 1 year)
   - Scopes: Select "Custom defined" → Check "Marketplace (Manage)"

3. **Copy the Token**:
   - ⚠️ IMPORTANT: Copy and save the token immediately - you won't see it again!

## Step 3: Update Your Extension Files

1. **Update package.json**:
   ```bash
   # Replace "your-publisher-name" with your actual publisher ID
   # Replace "your-username" with your GitHub username
   # Replace author name and email with your details
   ```

2. **Add an Icon** (optional but recommended):
   - Create a 128x128 PNG file named `icon.png`
   - Add to package.json: `"icon": "icon.png",`

3. **Create/Update GitHub Repository**:
   - Create a GitHub repository: `https://github.com/your-username/random-theme-switcher`
   - Push your code to this repository
   - Update the repository URLs in package.json

## Step 4: Install VSCE CLI and Login

```bash
# Install vsce globally (if not already installed)
npm install -g @vscode/vsce

# Login to marketplace
vsce login your-publisher-name
# Enter your Personal Access Token when prompted
```

## Step 5: Publish Your Extension

```bash
# Navigate to your extension directory
cd /Users/kadamati_chaitanya@optum.com/ghec/random-theme-switcher

# Package and publish in one step
vsce publish

# Or publish with version increment
vsce publish minor  # or major, patch
```

## Step 6: Verify Publication

1. **Check Marketplace**:
   - Visit: https://marketplace.visualstudio.com/publishers/your-publisher-name
   - Your extension should appear in your publisher profile

2. **Test Installation**:
   - In VS Code: Extensions → Search for "Random Theme Switcher"
   - Install and verify it works

## Alternative: Manual Upload

If CLI doesn't work:

1. **Package the Extension**:
   ```bash
   vsce package
   ```

2. **Manual Upload**:
   - Go to: https://marketplace.visualstudio.com/manage
   - Click "New extension" → "Visual Studio Code"
   - Upload your .vsix file
   - Fill in the details

## Important Notes Before Publishing

1. **Update these placeholders in package.json**:
   - `"publisher": "your-actual-publisher-id"`
   - Repository URL with your GitHub username
   - Author name and email

2. **Recommended additions**:
   - Add an icon.png file (128x128)
   - Ensure your GitHub repository is public
   - Add a good README.md with screenshots
   - Test the extension thoroughly

3. **Version Management**:
   - Start with version 1.0.0
   - Use semantic versioning (major.minor.patch)
   - Update version before each publication

## Troubleshooting

- **"Publisher not found"**: Make sure publisher ID in package.json exactly matches your marketplace publisher ID
- **"Personal Access Token invalid"**: Regenerate token and ensure "Marketplace (Manage)" scope is selected
- **"Package contains errors"**: Run `vsce package` first to check for issues

## Post-Publication

1. **Monitor Downloads**: Check your publisher dashboard regularly
2. **Respond to Reviews**: Address user feedback and issues
3. **Regular Updates**: Keep the extension updated and fix bugs
4. **Documentation**: Maintain good README and changelog

Your extension will be available to millions of VS Code users worldwide! 🚀