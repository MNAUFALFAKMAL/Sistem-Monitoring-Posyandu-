<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Pengaduan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;
use App\Mail\PengaduanResponded; // We will create this Mailable class

class PengaduanController extends Controller
{
    public function index(Request $request)
    {
        $pengaduans = Pengaduan::latest()->paginate(10);
        return response()->json($pengaduans);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nama' => 'required|string|max:255',
            'nik' => 'required|string|size:16',
            'email' => 'required|email|max:255',
            'no_hp' => 'required|string|max:15',
            'kategori' => 'required|in:pelayanan,informasi,kritik_saran,pengaduan_lain',
            'subjek' => 'required|string|max:255',
            'pesan' => 'required|string|min:20',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $pengaduan = Pengaduan::create($request->all());

        return response()->json([
            'message' => 'Pengaduan created successfully',
            'data' => $pengaduan
        ], 201);
    }

    public function show(Pengaduan $pengaduan)
    {
        return response()->json(['data' => $pengaduan]);
    }

    public function update(Request $request, Pengaduan $pengaduan)
    {
        // This is for general updates, but we will mainly use the respond method
        $validator = Validator::make($request->all(), [
            'status' => 'sometimes|required|in:baru,diproses,selesai',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $pengaduan->update($request->all());

        return response()->json([
            'message' => 'Pengaduan updated successfully',
            'data' => $pengaduan
        ]);
    }

    public function respond(Request $request, Pengaduan $pengaduan)
    {
        $validator = Validator::make($request->all(), [
            'response' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $pengaduan->tanggapan = $request->response;
        $pengaduan->status = 'selesai';
        $pengaduan->save();

        // Send email notification
        Mail::to($pengaduan->email)->send(new PengaduanResponded($pengaduan));

        return response()->json([
            'message' => 'Response sent successfully',
            'data' => $pengaduan
        ]);
    }

    public function destroy(Pengaduan $pengaduan)
    {
        $pengaduan->delete();

        return response()->json(['message' => 'Pengaduan deleted successfully']);
    }
}
