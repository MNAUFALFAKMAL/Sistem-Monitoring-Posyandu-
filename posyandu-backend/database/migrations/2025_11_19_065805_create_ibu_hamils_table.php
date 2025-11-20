<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('ibu_hamils', function (Blueprint $table) {
            $table->id();
            $table->string('nama');
            $table->string('nik', 16)->unique();
            $table->string('tempat_lahir');
            $table->date('tanggal_lahir');
            $table->text('alamat');
            $table->string('no_hp', 15);
            $table->string('nama_suami');
            $table->string('nik_suami', 16);
            $table->string('pekerjaan_suami');
            $table->date('hpht');
            $table->date('tanggal_periksa_pertama');
            $table->enum('status_kehamilan', ['trimester_1', 'trimester_2', 'trimester_3']);
            $table->enum('resiko_kehamilan', ['rendah', 'sedang', 'tinggi']);
            $table->decimal('berat_badan', 5, 2);
            $table->decimal('tinggi_badan', 5, 2);
            $table->decimal('lila', 5, 2);
            $table->string('tekanan_darah', 7); // e.g., 120/80
            $table->decimal('hemoglobin', 4, 1);
            $table->enum('golongan_darah', ['A', 'B', 'AB', 'O']);
            $table->text('catatan')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('ibu_hamils');
    }
};
