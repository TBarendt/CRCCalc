//------------------------------------------------------------------------------
// MIT License
//
// Copyright (c) 2021 Tobias Barendt
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.
//------------------------------------------------------------------------------

import * as vscode from 'vscode';
import CRC from './crc';

var listOfCRC =
	[
		new CRC(32, 0x04C11DB7, 0xFFFFFFFF, true, true, 0xFFFFFFFF, "CRC-32"),
		new CRC(32, 0x04C11DB7, 0xFFFFFFFF, false, false, 0xFFFFFFFF, "CRC-32/BZIP2"),
		new CRC(32, 0x1EDC6F41, 0xFFFFFFFF, true, true, 0xFFFFFFFF, "CRC-32C"),
		new CRC(32, 0xA833982B, 0xFFFFFFFF, true, true, 0xFFFFFFFF, "CRC-32D"),
		new CRC(32, 0x04C11DB7, 0xFFFFFFFF, false, false, 0x00000000, "CRC-32/MPEG-2"),
		new CRC(32, 0x04C11DB7, 0x00000000, false, false, 0xFFFFFFFF, "CRC-32/POSIX"),
		new CRC(32, 0x814141AB, 0x00000000, false, false, 0x00000000, "CRC-32Q"),
		new CRC(32, 0x04C11DB7, 0xFFFFFFFF, true, true, 0x00000000, "CRC-32/JAMCRC"),
		new CRC(32, 0x000000AF, 0x00000000, false, false, 0x00000000, "CRC-32/XFER"),

		new CRC(16, 0x8005, 0x0000, true, true, 0x0000, "CRC-16/ARC"),
		new CRC(16, 0x1021, 0xFFFF, false, false, 0x0000, "CRC-16/CCITT-FALSE"),
		new CRC(16, 0x1021, 0x1D0F, false, false, 0x0000, "CRC-16/AUG-CCITT"),
		new CRC(16, 0x8005, 0x0000, false, false, 0x0000, "CRC-16/BUYPASS"),
		new CRC(16, 0xC867, 0xFFFF, false, false, 0x0000, "CRC-16/CDMA2000"),
		new CRC(16, 0x8005, 0x800D, false, false, 0x0000, "CRC-16/DDS-110"),
		new CRC(16, 0x0589, 0x0000, false, false, 0x0001, "CRC-16/DECT-R"),
		new CRC(16, 0x0589, 0x0000, false, false, 0x0000, "CRC-16/DECT-X"),
		new CRC(16, 0x3D65, 0x0000, true, true, 0xFFFF, "CRC-16/DNP"),
		new CRC(16, 0x3D65, 0x0000, false, false, 0xFFFF, "CRC-16/EN-13757"),
		new CRC(16, 0x1021, 0xFFFF, false, false, 0xFFFF, "CRC-16/GENIBUS"),
		new CRC(16, 0x8005, 0x0000, true, true, 0xFFFF, "CRC-16/MAXIM"),
		new CRC(16, 0x1021, 0xFFFF, true, true, 0x0000, "CRC-16/MCRF4XX"),
		new CRC(16, 0x1021, 0xB2AA, true, true, 0x0000, "CRC-16/RIELLO"),
		new CRC(16, 0x8BB7, 0x0000, false, false, 0x0000, "CRC-16/T10-DIF"),
		new CRC(16, 0xA097, 0x0000, false, false, 0x0000, "CRC-16/TELEDISK"),
		new CRC(16, 0x1021, 0x89EC, true, true, 0x0000, "CRC-16/TMS37157"),
		new CRC(16, 0x8005, 0xFFFF, true, true, 0xFFFF, "CRC-16/USB"),
		new CRC(16, 0x1021, 0xC6C6, true, true, 0x0000, "CRC-A"),
		new CRC(16, 0x1021, 0x0000, true, true, 0x0000, "CRC-16/KERMIT"),
		new CRC(16, 0x8005, 0xFFFF, true, true, 0x0000, "CRC-16/MODBUS"),
		new CRC(16, 0x1021, 0xFFFF, true, true, 0xFFFF, "CRC-16/X-25"),
		new CRC(16, 0x1021, 0x0000, false, false, 0x0000, "CRC-16/XMODEM"),
		
		new CRC(8, 0x07, 0x00, false, false, 0x00, "CRC-8"),
		new CRC(8, 0x9B, 0xFF ,false ,false, 0x00, "CRC-8/CDMA2000"),
		new CRC(8, 0x39, 0x00, true, true, 0x00, "CRC-8/DARC"),
		new CRC(8, 0xD5, 0x00 ,false, false, 0x00, "CRC-8/DVB-S2"),
		new CRC(8, 0x1D, 0xFF, true, true, 0x00, "CRC-8/EBU"),
		new CRC(8, 0x1D, 0xFD, false, false, 0x00, "CRC-8/I-CODE"),
		new CRC(8, 0x07, 0x00, false, false, 0x55, "CRC-8/ITU"),
		new CRC(8, 0x31, 0x00, true, true, 0x00, "CRC-8/MAXIM"),
		new CRC(8, 0x07, 0xFF, true, true, 0x00, "CRC-8/ROHC"),
		new CRC(8, 0x9B, 0x00, true, true, 0x00, "CRC-8/WCDMA"),
	];


//------------------------------------------------------------------------------
// activate
//------------------------------------------------------------------------------
export function activate(context: vscode.ExtensionContext)
{
	for(var i = 0; i < listOfCRC.length; i++)
	{
		let crcTable = listOfCRC[i];
		const cmdFuncSelection = () =>
		{
			var editor = vscode.window.activeTextEditor;
			if(!editor)
				return;
			
			// Replace selections
			editor.selections.forEach((selection) =>
			{
				var editor = vscode.window.activeTextEditor;
				if(!editor)
					return;
				editor.edit((selectedText) =>
				{
					var editor = vscode.window.activeTextEditor;
					if(!editor)
						return;
					var doc = editor.document;
					var text = doc.getText(selection);
					function PadString(str: string, minLength: number, symbol: string)
					{
						var zero = 1 + minLength - str.toString().length;
						return Array(+(zero > 0 && zero)).join(symbol) + str;
					}

					
					let crc = crcTable.Compute(text);
					let crcText = "";
					if (vscode.workspace.getConfiguration("CrcCalc.settings").get("hexadecimal", true))
					{
						if(crcTable.Bits == 32)
						{
							let crc1 = (crc & 0xFFFF0000) >>> 16;
							let crc2 = crc & 0xFFFF;
							crcText = crcText + "0x" + PadString(crc1.toString(16), 4, "0").toUpperCase() + PadString(crc2.toString(16), 4, "0").toUpperCase();
						}
						else if(crcTable.Bits == 16)
						{
							crcText = crcText + "0x" + PadString(crc.toString(16), 4, "0").toUpperCase();
						}
						else if(crcTable.Bits == 8)
						{
							crcText = crcText + "0x" + PadString(crc.toString(16), 2, "0").toUpperCase();
						}
					}
					else
					{
						crcText = crcText + crc.toString();
					}

					if (vscode.workspace.getConfiguration("CrcCalc.settings").get("replace selection", false))
					{
						selectedText.replace(selection, crcText + " /*" + text + "*/");
					}
					else
					{
						crcText = crcTable.name + " = " + crcText;
						vscode.window.showInformationMessage(crcText);
					}
				});
			});
		}

		const cmdFuncDocument = () =>
		{
			var editor = vscode.window.activeTextEditor;
			if(!editor)
				return;

			var text = editor.document.getText();
			function PadString(str: string, minLength: number, symbol: string)
			{
				var zero = 1 + minLength - str.toString().length;
				return Array(+(zero > 0 && zero)).join(symbol) + str;
			}

			let crc = crcTable.Compute(text);
			let crcText = crcTable.name + " = ";
			if (vscode.workspace.getConfiguration("CrcCalc.settings").get("hexadecimal", true))
			{
				if(crcTable.Bits == 32)
				{
					let crc1 = (crc & 0xFFFF0000) >>> 16;
					let crc2 = crc & 0xFFFF;
					crcText = crcText + "0x" + PadString(crc1.toString(16), 4, "0").toUpperCase() + PadString(crc2.toString(16), 4, "0").toUpperCase();
				}
				else if(crcTable.Bits == 16)
				{
					crcText = crcText + "0x" + PadString(crc.toString(16), 4, "0").toUpperCase();
				}
				else if(crcTable.Bits == 8)
				{
					crcText = crcText + "0x" + PadString(crc.toString(16), 2, "0").toUpperCase();
				}
			}
			else
			{
				crcText = crcText + crc.toString();
			}
			vscode.window.showInformationMessage(crcText);
		};

		context.subscriptions.push(vscode.commands.registerCommand("crccalc." + crcTable.name + ".selection", cmdFuncSelection));
		context.subscriptions.push(vscode.commands.registerCommand("crccalc." + crcTable.name + ".document", cmdFuncDocument));
	}
}

//------------------------------------------------------------------------------
// Exports
export function deactivate() {}
