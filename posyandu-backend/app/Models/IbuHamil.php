<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class IbuHamil extends Model
{
    use HasFactory;

    protected $fillable = [
        'nama',
        'nik',
        'tempat_lahir',
        'tanggal_lahir',
        'alamat',
        'no_hp',
        'nama_suami',
        'nik_suami',
        'pekerjaan_suami',
        'hpht',
        'tanggal_periksa_pertama',
        'status_kehamilan',
        'resiko_kehamilan',
        'berat_badan',
        'tinggi_badan',
        'lila',
        'tekanan_darah',
        'hemoglobin',
        'golongan_darah',
        'catatan',
    ];

    protected $casts = [
        'tanggal_lahir' => 'date',
        'hpht' => 'date',
        'tanggal_periksa_pertama' => 'date',
        'berat_badan' => 'float',
        'tinggi_badan' => 'float',
        'lila' => 'float',
        'hemoglobin' => 'float',
    ];
}
