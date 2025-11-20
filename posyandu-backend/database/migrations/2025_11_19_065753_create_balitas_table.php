<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('balitas', function (Blueprint $table) {
            $table->id();
            $table->string('nama');
            $table->string('nik', 16)->unique();
            $table->enum('jenis_kelamin', ['L', 'P']);
            $table->string('tempat_lahir');
            $table->date('tanggal_lahir');
            $table->string('nama_ortu');
            $table->string('nik_ortu', 16);
            $table->text('alamat');
            $table->decimal('berat_lahir', 5, 2);
            $table->decimal('tinggi_lahir', 5, 2);
            $table->decimal('berat_sekarang', 5, 2)->nullable();
            $table->decimal('tinggi_sekarang', 5, 2)->nullable();
            $table->enum('status_gizi', ['baik', 'kurang', 'buruk'])->nullable();
            $table->enum('status_imunisasi', ['lengkap', 'tidak_lengkap', 'belum'])->nullable();
            $table->enum('status_vitamin_a', ['sudah', 'belum'])->nullable();
            $table->text('catatan')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('balitas');
    }
};
