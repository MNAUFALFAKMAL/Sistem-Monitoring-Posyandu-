<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>Tanggapan Pengaduan</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
    <div style="max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
        <h2 style="color: #007bff;">Halo, {{ $pengaduan->nama }}!</h2>
        <p>Terima kasih telah mengajukan pengaduan kepada kami. Pengaduan Anda dengan subjek "<strong>{{ $pengaduan->subjek }}</strong>" telah kami tanggapi.</p>

        <div style="background-color: #f9f9f9; padding: 15px; border-left: 4px solid #007bff; margin: 20px 0;">
            <h4 style="margin-top: 0;">Tanggapan dari Posyandu:</h4>
            <p>{{ nl2br(e($pengaduan->tanggapan)) }}</p>
        </div>

        <p>Jika Anda memiliki pertanyaan lebih lanjut, jangan ragu untuk menghubungi kami kembali.</p>

        <p>Terima kasih.</p>
        <p><strong>Tim Posyandu Desa</strong></p>
    </div>
</body>
</html>
