import * as vscode from 'vscode';

let lastSpacePressTime: number | undefined;
const doublePressDelay = 300;  

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand('extension.doubleSpaceEnter', () => {
    const editor = vscode.window.activeTextEditor;
    if (!editor) return;

    const position = editor.selection.active;
    const currentTime = new Date().getTime();

    if (lastSpacePressTime && (currentTime - lastSpacePressTime) < doublePressDelay) {
      editor.edit(editBuilder => {
        editBuilder.insert(position, '\n');
      });
      lastSpacePressTime = undefined;
    } else {
      editor.edit(editBuilder => {
        editBuilder.insert(position, ' ');
      });
      lastSpacePressTime = currentTime; 
    }
  });

  context.subscriptions.push(disposable);
}

export function deactivate() {}
