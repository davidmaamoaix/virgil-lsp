import * as vscode from 'vscode';

import {
    LanguageClient
} from "vscode-languageclient/node";

let client: LanguageClient | null = null;

export function activate(context: vscode.ExtensionContext) {
    if (client !== null) {
        console.warn("Virgil LSP is already running. This is likely a bug.");
        return;
    }

    const config = vscode.workspace.getConfiguration("virgil-lsp");
    console.log(config.get("server.path"));

    const disposable = vscode.commands.registerCommand('virgil-lsp.helloWorld', () => {
        vscode.window.showInformationMessage('Hello World from virgil-lsp!');
    });

    context.subscriptions.push(disposable);
}

export async function deactivate() {
    if (client !== null) {
        await client.stop();
        client = null;
    }
}
