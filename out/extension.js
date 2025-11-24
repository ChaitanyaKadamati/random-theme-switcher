"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = activate;
exports.deactivate = deactivate;
const vscode = __importStar(require("vscode"));
function activate(context) {
    console.log('Random Theme Switcher extension is now active!');
    let intervalId;
    // Get all available themes
    async function getAllAvailableThemes() {
        try {
            // Get all installed extensions
            const extensions = vscode.extensions.all;
            const themes = [];
            // Add built-in themes
            const builtInThemes = [
                'Default Dark Modern',
                'Default Light Modern',
                'Default Dark+',
                'Default Light+',
                'Default High Contrast',
                'Default High Contrast Light',
                'Monokai',
                'Monokai Dimmed',
                'Quiet Light',
                'Red',
                'Solarized Dark',
                'Solarized Light',
                'Tomorrow Night Blue'
            ];
            themes.push(...builtInThemes);
            // Get themes from installed extensions
            for (const extension of extensions) {
                if (extension.packageJSON?.contributes?.themes) {
                    const extensionThemes = extension.packageJSON.contributes.themes;
                    for (const theme of extensionThemes) {
                        if (theme.label) {
                            themes.push(theme.label);
                        }
                    }
                }
            }
            return [...new Set(themes)]; // Remove duplicates
        }
        catch (error) {
            console.error('Error getting themes:', error);
            return [
                'Default Dark Modern',
                'Default Light Modern',
                'Default Dark+',
                'Default Light+',
                'Monokai',
                'Solarized Dark',
                'Solarized Light'
            ];
        }
    }
    // Initialize theme list in settings if empty
    async function initializeThemeList() {
        const config = vscode.workspace.getConfiguration('randomThemeSwitcher');
        const currentThemes = config.get('themeList');
        if (!currentThemes || currentThemes.length === 0) {
            const availableThemes = await getAllAvailableThemes();
            await config.update('themeList', availableThemes, vscode.ConfigurationTarget.Global);
            vscode.window.showInformationMessage(`Random Theme Switcher: Initialized with ${availableThemes.length} available themes.`);
        }
    }
    // Switch to a random theme
    async function switchToRandomTheme() {
        const config = vscode.workspace.getConfiguration('randomThemeSwitcher');
        const themeList = config.get('themeList') || [];
        if (themeList.length === 0) {
            vscode.window.showWarningMessage('Random Theme Switcher: No themes configured. Please add themes to the settings.');
            return;
        }
        // Get current theme to avoid switching to the same theme
        const currentTheme = vscode.workspace.getConfiguration('workbench').get('colorTheme');
        let availableThemes = themeList.filter(theme => theme !== currentTheme);
        // If all themes filtered out, use original list
        if (availableThemes.length === 0) {
            availableThemes = themeList;
        }
        const randomIndex = Math.floor(Math.random() * availableThemes.length);
        const selectedTheme = availableThemes[randomIndex];
        try {
            await vscode.workspace.getConfiguration('workbench').update('colorTheme', selectedTheme, vscode.ConfigurationTarget.Global);
            console.log(`Random Theme Switcher: Switched to theme "${selectedTheme}"`);
        }
        catch (error) {
            console.error('Error switching theme:', error);
            vscode.window.showErrorMessage(`Failed to switch to theme "${selectedTheme}". It may not be installed.`);
        }
    }
    // Start the auto-switching timer
    function startAutoSwitching() {
        const config = vscode.workspace.getConfiguration('randomThemeSwitcher');
        const intervalMinutes = config.get('intervalMinutes') || 30;
        const intervalMs = intervalMinutes * 60 * 1000;
        // Clear existing interval
        if (intervalId) {
            clearInterval(intervalId);
        }
        intervalId = setInterval(() => {
            switchToRandomTheme();
        }, intervalMs);
        console.log(`Random Theme Switcher: Auto-switching enabled with ${intervalMinutes} minute interval`);
    }
    // Stop the auto-switching timer
    function stopAutoSwitching() {
        if (intervalId) {
            clearInterval(intervalId);
            intervalId = undefined;
        }
        console.log('Random Theme Switcher: Auto-switching disabled');
    }
    // Check if auto-switching should be enabled on startup
    function checkAutoSwitchingOnStartup() {
        const config = vscode.workspace.getConfiguration('randomThemeSwitcher');
        const enabled = config.get('enabled');
        if (enabled) {
            startAutoSwitching();
        }
    }
    // Register commands
    const enableCommand = vscode.commands.registerCommand('randomThemeSwitcher.enable', async () => {
        const config = vscode.workspace.getConfiguration('randomThemeSwitcher');
        await config.update('enabled', true, vscode.ConfigurationTarget.Global);
        startAutoSwitching();
        vscode.window.showInformationMessage('Random Theme Switcher: Enabled');
    });
    const disableCommand = vscode.commands.registerCommand('randomThemeSwitcher.disable', async () => {
        const config = vscode.workspace.getConfiguration('randomThemeSwitcher');
        await config.update('enabled', false, vscode.ConfigurationTarget.Global);
        stopAutoSwitching();
        vscode.window.showInformationMessage('Random Theme Switcher: Disabled');
    });
    const switchNowCommand = vscode.commands.registerCommand('randomThemeSwitcher.switchNow', () => {
        switchToRandomTheme();
    });
    // Register a command to refresh the theme list
    const refreshThemesCommand = vscode.commands.registerCommand('randomThemeSwitcher.refreshThemes', async () => {
        const availableThemes = await getAllAvailableThemes();
        const config = vscode.workspace.getConfiguration('randomThemeSwitcher');
        await config.update('themeList', availableThemes, vscode.ConfigurationTarget.Global);
        vscode.window.showInformationMessage(`Random Theme Switcher: Updated theme list with ${availableThemes.length} themes.`);
    });
    // Listen for configuration changes
    const configChangeListener = vscode.workspace.onDidChangeConfiguration(event => {
        if (event.affectsConfiguration('randomThemeSwitcher')) {
            const config = vscode.workspace.getConfiguration('randomThemeSwitcher');
            const enabled = config.get('enabled');
            if (enabled) {
                startAutoSwitching(); // Restart with new interval if needed
            }
            else {
                stopAutoSwitching();
            }
        }
    });
    // Add subscriptions to context
    context.subscriptions.push(enableCommand, disableCommand, switchNowCommand, refreshThemesCommand, configChangeListener);
    // Initialize extension
    initializeThemeList();
    checkAutoSwitchingOnStartup();
}
function deactivate() {
    console.log('Random Theme Switcher extension is deactivated');
}
//# sourceMappingURL=extension.js.map