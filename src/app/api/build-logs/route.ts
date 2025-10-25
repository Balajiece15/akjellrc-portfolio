import { NextRequest, NextResponse } from 'next/server'
import { BuildLogStorage } from '@/lib/redis-storage'

export async function GET() {
  try {
    const buildEntries = await BuildLogStorage.getAllBuildEntries()
    return NextResponse.json(buildEntries)
  } catch (error) {
    console.error('GET /api/build-logs error:', error)
    return NextResponse.json({ error: 'Failed to fetch build entries' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate required fields
    if (!body.date || !body.brokenPart || !body.upgradedTo || body.cost === undefined || !body.category || !body.notes) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Validate category
    if (!['repair', 'upgrade', 'maintenance'].includes(body.category)) {
      return NextResponse.json({ error: 'Invalid category' }, { status: 400 })
    }

    const newEntry = await BuildLogStorage.addBuildEntry(body)
    return NextResponse.json(newEntry, { status: 201 })
  } catch (error) {
    console.error('POST /api/build-logs error:', error)
    return NextResponse.json({ error: 'Failed to create build entry' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, ...updateData } = body
    
    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 })
    }

    // Validate category if provided
    if (updateData.category && !['repair', 'upgrade', 'maintenance'].includes(updateData.category)) {
      return NextResponse.json({ error: 'Invalid category' }, { status: 400 })
    }

    const updatedEntry = await BuildLogStorage.updateBuildEntry(id, updateData)
    
    if (!updatedEntry) {
      return NextResponse.json({ error: 'Build entry not found' }, { status: 404 })
    }
    
    return NextResponse.json(updatedEntry)
  } catch (error) {
    console.error('PUT /api/build-logs error:', error)
    return NextResponse.json({ error: 'Failed to update build entry' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    
    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 })
    }
    
    const deleted = await BuildLogStorage.deleteBuildEntry(parseInt(id))
    
    if (!deleted) {
      return NextResponse.json({ error: 'Build entry not found' }, { status: 404 })
    }
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('DELETE /api/build-logs error:', error)
    return NextResponse.json({ error: 'Failed to delete build entry' }, { status: 500 })
  }
}