import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export async function POST(request: Request) {
  try {
    const { feedback } = await request.json();
    
    if (!feedback || typeof feedback !== 'string') {
      return NextResponse.json({ error: 'Invalid feedback data' }, { status: 400 });
    }

    // Create a timestamped entry
    const timestamp = new Date().toISOString();
    const feedbackEntry = `[${timestamp}]\n${feedback}\n\n`;
    
    // Define the feedback file path
    const filePath = path.join(process.cwd(), 'feedback.txt');

    // Append the feedback to the file (create if doesn't exist)
    try {
      await fs.appendFile(filePath, feedbackEntry);
    } catch (error) {
      console.error('Error writing to feedback file:', error);
      return NextResponse.json({ error: 'Failed to save feedback' }, { status: 500 });
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error processing feedback:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
