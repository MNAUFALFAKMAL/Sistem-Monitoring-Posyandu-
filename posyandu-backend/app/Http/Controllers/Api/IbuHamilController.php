<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\IbuHamil;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class IbuHamilController extends Controller
{
    public function index(Request $request)
    {
        $query = IbuHamil::query();

        if ($request->has('search')) {
            $search = $request->get('search');
            $query->where('nama', 'like', '%' . $search . '%')
                  ->orWhere('nama_suami', 'like', '%' . $search . '%');
        }

        if ($request->has('status_kehamilan')) {
            $query->where('status_kehamilan', $request->get('status_kehamilan'));
        }

        $ibuHamils = $query->paginate(10);

        return response()->json($ibuHamils);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nama' => 'required|string|max:255',
            'nik' => 'required|string|size:16|unique:ibu_hamils,nik',
            'tempat_lahir' => 'required|string|max:255',
            'tanggal_lahir' => 'required|date',
            'alamat' => 'required|string',
            'no_hp' => 'required|string|max:15',
            'nama_suami' => 'required|string|max:255',
            'nik_suami' => 'required|string|size:16',
            'pekerjaan_suami' => 'required|string|max:255',
            'hpht' => 'required|date',
            'tanggal_periksa_pertama' => 'required|date',
            'status_kehamilan' => 'required|in:trimester_1,trimester_2,trimester_3',
            'resiko_kehamilan' => 'required|in:rendah,sedang,tinggi',
            'berat_badan' => 'required|numeric|min:30|max:150',
            'tinggi_badan' => 'required|numeric|min:100|max:220',
            'lila' => 'required|numeric|min:10|max:50',
            'tekanan_darah' => 'required|string|regex:/^\d{2,3}\/\d{2,3}$/',
            'hemoglobin' => 'required|numeric|min:5|max:20',
            'golongan_darah' => 'required|in:A,B,AB,O',
            'catatan' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $ibuHamil = IbuHamil::create($request->all());

        return response()->json([
            'message' => 'Ibu Hamil created successfully',
            'data' => $ibuHamil
        ], 201);
    }

    public function show(IbuHamil $ibuHamil)
    {
        return response()->json(['data' => $ibuHamil]);
    }

    public function update(Request $request, IbuHamil $ibuHamil)
    {
        $validator = Validator::make($request->all(), [
            'nama' => 'required|string|max:255',
            'nik' => 'required|string|size:16|unique:ibu_hamils,nik,' . $ibuHamil->id,
            'tempat_lahir' => 'required|string|max:255',
            'tanggal_lahir' => 'required|date',
            'alamat' => 'required|string',
            'no_hp' => 'required|string|max:15',
            'nama_suami' => 'required|string|max:255',
            'nik_suami' => 'required|string|size:16',
            'pekerjaan_suami' => 'required|string|max:255',
            'hpht' => 'required|date',
            'tanggal_periksa_pertama' => 'required|date',
            'status_kehamilan' => 'required|in:trimester_1,trimester_2,trimester_3',
            'resiko_kehamilan' => 'required|in:rendah,sedang,tinggi',
            'berat_badan' => 'required|numeric|min:30|max:150',
            'tinggi_badan' => 'required|numeric|min:100|max:220',
            'lila' => 'required|numeric|min:10|max:50',
            'tekanan_darah' => 'required|string|regex:/^\d{2,3}\/\d{2,3}$/',
            'hemoglobin' => 'required|numeric|min:5|max:20',
            'golongan_darah' => 'required|in:A,B,AB,O',
            'catatan' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $ibuHamil->update($request->all());

        return response()->json([
            'message' => 'Ibu Hamil updated successfully',
            'data' => $ibuHamil
        ]);
    }

    public function destroy(IbuHamil $ibuHamil)
    {
        $ibuHamil->delete();

        return response()->json(['message' => 'Ibu Hamil deleted successfully']);
    }
}
