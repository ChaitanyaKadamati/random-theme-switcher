#!/bin/bash

# Random Theme Switcher - Pre-Publication Checklist & Script
# Run this script after updating your publisher information

echo "🎨 Random Theme Switcher - Publication Preparation"
echo "=================================================="

# Check if required fields are updated
echo "📋 Pre-publication checklist:"
echo ""

# Function to check if placeholder values exist
check_placeholder() {
    if grep -q "your-publisher-name\|your-username\|Your Name\|your.email@example.com" package.json; then
        echo "❌ Found placeholder values in package.json"
        echo "   Please update the following in package.json:"
        echo "   - publisher: 'your-publisher-name' → your actual publisher ID"
        echo "   - repository URLs: 'your-username' → your GitHub username" 
        echo "   - author name: 'Your Name' → your actual name"
        echo "   - author email: 'your.email@example.com' → your actual email"
        return 1
    else
        echo "✅ Publisher information looks updated"
        return 0
    fi
}

# Check for icon file
check_icon() {
    if [ -f "icon.png" ]; then
        echo "✅ Icon file found (icon.png)"
        return 0
    else
        echo "⚠️  No icon.png file found (optional but recommended)"
        echo "   Create a 128x128 PNG icon and add '\"icon\": \"icon.png\",' to package.json"
        return 0
    fi
}

# Run checks
check_placeholder
placeholder_status=$?

check_icon

echo ""
echo "🔧 Next steps:"
echo "1. Create publisher account at: https://marketplace.visualstudio.com/manage"
echo "2. Get Personal Access Token from: https://dev.azure.com"
echo "3. Update placeholder values in package.json"
echo "4. Optionally add icon.png (128x128)"
echo "5. Create GitHub repository and push code"
echo "6. Run publication commands"
echo ""

if [ $placeholder_status -eq 0 ]; then
    echo "🚀 Ready to publish! Run these commands:"
    echo ""
    echo "# Login to marketplace (enter your Personal Access Token when prompted)"
    echo "vsce login $(grep -o '\"publisher\": \"[^\"]*\"' package.json | cut -d'\"' -f4)"
    echo ""
    echo "# Package and publish"
    echo "vsce publish"
    echo ""
    echo "# Or just package for manual upload"
    echo "vsce package"
    echo ""
else
    echo "⚠️  Please complete the checklist items above before publishing"
fi

echo "📚 See PUBLISH-GUIDE.md for detailed instructions"