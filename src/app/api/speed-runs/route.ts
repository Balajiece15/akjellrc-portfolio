import { NextRequest, NextResponse } from 'next/server'
import { SpeedRunStorage } from '@/lib/redis-storage'

export async function GET() {
  try {
    const speedRuns = await SpeedRunStorage.getAllSpeedRuns()
    return NextResponse.json(speedRuns)
  } catch (error) {
    console.error('GET /api/speed-runs error:', error)
    return NextResponse.json({ error: 'Failed to fetch speed runs' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate required fields
    if (!body.date || !body.speed || !body.gearing || !body.battery || !body.notes) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const newRun = await SpeedRunStorage.addSpeedRun(body)
    return NextResponse.json(newRun, { status: 201 })
  } catch (error) {
    console.error('POST /api/speed-runs error:', error)
    return NextResponse.json({ error: 'Failed to create speed run' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, ...updateData } = body
    
    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 })
    }

    const updatedRun = await SpeedRunStorage.updateSpeedRun(id, updateData)
    
    if (!updatedRun) {
      return NextResponse.json({ error: 'Speed run not found' }, { status: 404 })
    }
    
    return NextResponse.json(updatedRun)
  } catch (error) {
    console.error('PUT /api/speed-runs error:', error)
    return NextResponse.json({ error: 'Failed to update speed run' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    
    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 })
    }
    
    const deleted = await SpeedRunStorage.deleteSpeedRun(parseInt(id))
    
    if (!deleted) {
      return NextResponse.json({ error: 'Speed run not found' }, { status: 404 })
    }
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('DELETE /api/speed-runs error:', error)
    return NextResponse.json({ error: 'Failed to delete speed run' }, { status: 500 })
  }
}