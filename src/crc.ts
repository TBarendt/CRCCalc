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

class CRC
{
	//--------------------------------------------------------------------------
	// Constructor
	//--------------------------------------------------------------------------
	constructor(bits: number, poly: number, init: number, reflIn: boolean, reflOut: boolean, xor: number, name: string)
	{
		// Cast & msb masks
		if(bits == 8)
			this.m_castMask = 0xFF;
		else if(bits == 16)
			this.m_castMask = 0xFFFF;
		else if(bits == 32)
			this.m_castMask = 0xFFFFFFFF;
		else
			throw "Invalid bit length, must be 8, 16 or 32!";
		var msbMask = 0x01 << (bits - 1);

		// Cache settings
		this.m_name = name;
		this.m_bits = bits;
		this.m_initialValue = init;
		this.m_xor = xor;
		this.m_reflIn = reflIn;
		this.m_reflOut = reflOut;

		// Create table
		this.m_crcTable = new Array(256);
		for(var i = 0; i < 256; i++)
		{
			var byte = (i << (this.m_bits - 8)) & this.m_castMask;
			for(var bit = 0; bit < 8; bit++)
			{
				if((byte & msbMask) != 0)
				{
					byte <<= 1;
					byte ^= poly;
				}
				else
				{
					byte <<= 1;
				}
			}
			this.m_crcTable[i] = (byte & this.m_castMask);
		}
	}

	//--------------------------------------------------------------------------
	// Compute
	//--------------------------------------------------------------------------
	public Compute(str: string)
	{
		var crc = this.m_initialValue;
		for(var i = 0; i < str.length; i++)
		{
			var byte = str.charCodeAt(i);
			if(this.m_reflIn)
				byte = this.Reflect(8, byte);
			
			crc = (crc ^ (byte << (this.m_bits - 8))) & this.m_castMask; 
			var t = (crc >> (this.m_bits - 8)) & 0xFF;
			crc = (crc << 8) & this.m_castMask;
			crc = (crc ^ this.m_crcTable[t]) & this.m_castMask;
		}

		if(this.m_reflOut)
			crc = this.Reflect(this.m_bits, crc);
		crc ^= this.m_xor;
		crc &= this.m_castMask;
		return crc;
	}

	//--------------------------------------------------------------------------
	// Reflect
	//--------------------------------------------------------------------------
	private Reflect(bits : number, value : number) 
	{
		var reflected = 0;
		for(var i = 0; i < bits; i++)
		{
			if((value & (1 << i)) != 0)
			{
				reflected |= (1 << ((bits - 1) - i));
			}
		}
		return reflected;
	}

	//--------------------------------------------------------------------------
	// Name
	//--------------------------------------------------------------------------
	public get name(){return this.m_name;}

	//--------------------------------------------------------------------------
	// Bits
	//--------------------------------------------------------------------------
	public get Bits(){return this.m_bits;}

	//--------------------------------------------------------------------------
	// Settings
	private m_name: string = "";
	private m_bits: number = 0;
	private m_initialValue: number = 0;
	private m_xor: number = 0;
	private m_reflIn: boolean = false;
	private m_reflOut: boolean = false;
	private m_crcTable: number[] = [0];
	private m_castMask: number = 0;
}

//------------------------------------------------------------------------------
// Exports
export default CRC;
