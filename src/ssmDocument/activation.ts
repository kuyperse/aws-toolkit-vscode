/*!
 * Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

import * as vscode from 'vscode'
import { activate as activateDecor } from './ssm/ssmDecoration'
import { activate as activateSSMLanguageServer } from './ssm/ssmClient'
import { AwsContext } from '../shared/awsContext'

import { createSsmDocumentFromTemplate } from './commands/createDocumentFromTemplate'
import * as telemetry from '../shared/telemetry/telemetry'

/* Please ignore this for now. This will be included in a future CR
import { openDocumentItem } from './commands/openDocumentItem'
import { DocumentItemNode } from './explorer/documentItemNode'
*/

// Activate SSM Document related functionality for the extension.

export async function activate(
    extensionContext: vscode.ExtensionContext,
    awsContext: AwsContext,
    outputChannel: vscode.OutputChannel
): Promise<void> {
    await registerSsmDocumentCommands(extensionContext, awsContext, outputChannel)
    await activateSSMLanguageServer(extensionContext)
    activateDecor(extensionContext)
}

async function registerSsmDocumentCommands(
    extensionContext: vscode.ExtensionContext,
    awsContext: AwsContext,
    outputChannel: vscode.OutputChannel
): Promise<void> {
    extensionContext.subscriptions.push(
        vscode.commands.registerCommand('aws.ssmDocument.createLocalDocument', async () => {
            try {
                await createSsmDocumentFromTemplate()
            } finally {
                telemetry.recordSsmCreateDocument()
            }
        })
    )
    /* Please ignore this for now. This will be included in a future CR
    extensionContext.subscriptions.push(
        vscode.commands.registerCommand('aws.ssmDocument.openLocalDocument', async (node: DocumentItemNode) => {
            await openDocumentItem(node, awsContext)
        })
    )
    */
}