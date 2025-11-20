<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Balita;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class BalitaController extends Controller
{
    public function index(Request $request)
    {
        $query = Balita::query();

        if ($request->has('search')) {
            $search = $request->get('search');
            $query->where('nama', 'like', '%' . $search . '%')
                  ->orWhere('nama_ortu', 'like', '%' . $search . '%');
        }

        if ($request->has('status_gizi')) {
            $query->where('status_gizi', $request->get('status_gizi'));
        }

        $balitas = $query->paginate(10);

        return response()->json($balitas);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nama' => 'required|string|max:255',
            'nik' => 'required|string|size:16|unique:balitas,nik',
            'jenis_kelamin' => 'required|in:L,P',
            'tempat_lahir' => 'required|string|max:255',
            'tanggal_lahir' => 'required|date',
            'nama_ortu' => 'required|string|max:255',
            'nik_ortu' => 'required|string|size:16',
            'alamat' => 'required|string',
            'berat_lahir' => 'required|numeric|min:0.5|max:10',
            'tinggi_lahir' => 'required|numeric|min:20|max:100',
            'berat_sekarang' => 'nullable|numeric|min:0.5|max:50',
            'tinggi_sekarang' => 'nullable|numeric|min:20|max:150',
            'status_gizi' => 'nullable|in:baik,kurang,buruk',
            'status_imunisasi' => 'nullable|in:lengkap,tidak_lengkap,belum',
            'status_vitamin_a' => 'nullable|in:sudah,belum',
            'catatan' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $balita = Balita::create($request->all());

        return response()->json([
            'message' => 'Balita created successfully',
            'data' => $balita
        ], 201);
    }

    public function show(Balita $balita)
    {
        return response()->json(['data' => $balita]);
    }

    public function update(Request $request, Balita $balita)
    {
        $validator = Validator::make($request->all(), [
            'nama' => 'required|string|max:255',
            'nik' => 'required|string|size:16|unique:balitas,nik,' . $balita->id,
            'jenis_kelamin' => 'required|in:L,P',
            'tempat_lahir' => 'required|string|max:255',
            'tanggal_lahir' => 'required|date',
            'nama_ortu' => 'required|string|max:255',
            'nik_ortu' => 'required|string|size:16',
            'alamat' => 'required|string',
            'berat_lahir' => 'required|numeric|min:0.5|max:10',
            'tinggi_lahir' => 'required|numeric|min:20|max:100',
            'berat_sekarang' => 'nullable|numeric|min:0.5|max:50',
            'tinggi_sekarang' => 'nullable|numeric|min:20|max:150',
            'status_gizi' => 'nullable|in:baik,kurang,buruk',
            'status_imunisasi' => 'nullable|in:lengkap,tidak_lengkap,belum',
            'status_vitamin_a' => 'nullable|in:sudah,belum',
            'catatan' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $balita->update($request->all());

        return response()->json([
            'message' => 'Balita updated successfully',
            'data' => $balita
        ]);
    }

    public function destroy(Balita $balita)
    {
        $balita->delete();

        return response()->json(['message' => 'Balita deleted successfully']);
    }
}
