import { NextRequest, NextResponse } from 'next/server';
import { suggestTags } from '@/ai/flows/suggest-tags';

export async function POST(req: NextRequest) {
  try {
    const { content } = await req.json();
    if (!content) {
      return NextResponse.json({ error: 'Missing content in request body' }, { status: 400 });
    }

    const suggestedTags = await suggestTags({ blogPostContent: content });

    return NextResponse.json(suggestedTags);
  } catch (error) {
    console.error('Error suggesting tags:', error);
    return NextResponse.json({ error: 'Failed to suggest tags' }, { status: 500 });
  }
}