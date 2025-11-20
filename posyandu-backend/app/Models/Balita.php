<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Balita extends Model
{
    use HasFactory;

    protected $fillable = [
        'nama',
        'nik',
        'jenis_kelamin',
        'tempat_lahir',
        'tanggal_lahir',
        'nama_ortu',
        'nik_ortu',
        'alamat',
        'berat_lahir',
        'tinggi_lahir',
        'berat_sekarang',
        'tinggi_sekarang',
        'status_gizi',
        'status_imunisasi',
        'status_vitamin_a',
        'catatan',
    ];

    protected $casts = [
        'tanggal_lahir' => 'date',
        'berat_lahir' => 'float',
        'tinggi_lahir' => 'float',
        'berat_sekarang' => 'float',
        'tinggi_sekarang' => 'float',
    ];
}
