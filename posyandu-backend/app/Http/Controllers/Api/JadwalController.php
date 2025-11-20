<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Jadwal;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class JadwalController extends Controller
{
    public function index(Request $request)
    {
        $query = Jadwal::query()->orderBy('tanggal', 'asc');

        if ($request->has('jenis')) {
            $query->where('jenis', $request->get('jenis'));
        }

        $jadwals = $query->paginate(10);

        return response()->json($jadwals);
    }

    public function upcoming()
    {
        $jadwals = Jadwal::where('tanggal', '>=', now()->toDateString())
            ->orderBy('tanggal', 'asc')
            ->get();

        return response()->json(['data' => $jadwals]);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'judul' => 'required|string|max:255',
            'deskripsi' => 'nullable|string',
            'tanggal' => 'required|date|after_or_equal:today',
            'waktu_mulai' => 'required|date_format:H:i',
            'waktu_selesai' => 'required|date_format:H:i|after:waktu_mulai',
            'lokasi' => 'required|string|max:255',
            'petugas' => 'required|string|max:255',
            'jenis' => 'required|in:balita,ibu_hamil',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $jadwal = Jadwal::create($request->all());

        return response()->json([
            'message' => 'Jadwal created successfully',
            'data' => $jadwal
        ], 201);
    }

    public function show(Jadwal $jadwal)
    {
        return response()->json(['data' => $jadwal]);
    }

    public function update(Request $request, Jadwal $jadwal)
    {
        $validator = Validator::make($request->all(), [
            'judul' => 'required|string|max:255',
            'deskripsi' => 'nullable|string',
            'tanggal' => 'required|date|after_or_equal:today',
            'waktu_mulai' => 'required|date_format:H:i',
            'waktu_selesai' => 'required|date_format:H:i|after:waktu_mulai',
            'lokasi' => 'required|string|max:255',
            'petugas' => 'required|string|max:255',
            'jenis' => 'required|in:balita,ibu_hamil',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $jadwal->update($request->all());

        return response()->json([
            'message' => 'Jadwal updated successfully',
            'data' => $jadwal
        ]);
    }

    public function destroy(Jadwal $jadwal)
    {
        $jadwal->delete();

        return response()->json(['message' => 'Jadwal deleted successfully']);
    }
}
