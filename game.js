class MainScene extends Phaser.Scene {
    constructor() {
        super('MainScene');
    }

    preload() {
        // Memuat aset gambar dan audio
        this.load.image('background', 'assets/3.jpg');
        this.load.spritesheet('birdSprite', 'assets/BIRD2.png', { frameWidth: 160, frameHeight: 150 });
        this.load.image('playButton', 'assets/PLAY.png');
        this.load.image('homeButton', 'assets/HOME.png');
        this.load.image('menuButton', 'assets/MENU.png');
        this.load.image('backButton', 'assets/BACK.png');
        this.load.image('restartButton', 'assets/AGAIN.png');
        this.load.image('gameoverButton', 'assets/GAMEOVER.png');
        this.load.image('titleImage', 'assets/text_judul.png');
        this.load.image('image', 'assets/CREDITS.png');
        this.load.image('background2', 'assets/bg_new2.jpg');
        this.load.audio('musikGame', 'assets/MUSIC.mp3');
        this.load.audio('klikplay', 'assets/button-pressed.mp3');
        this.load.audio('musikgame2', 'assets/music_8.mp3');
        this.load.audio('YES', 'assets/benar.mp3');
        this.load.audio('NO', 'assets/salah.mp3');
        this.load.audio('menu', 'assets/MENU.mp3');
    }

    create() {
        // Tambahkan musik dan atur agar berulang
        this.music = this.sound.add('musikGame', { loop: true, volume: 2.8});
        this.music.play(); // Mainkan musik

        // Tambahkan background dengan efek fade in
        const bg = this.add.image(1250 / 2, 570 / 2, 'background').setScale(0.66, 0.6).setDepth(-1);
        bg.alpha = 0;
        this.tweens.add({
            targets: bg,
            alpha: 1,
            duration: 1000,
            ease: 'Power2'
        });

      // Membuat animasi burung
        this.anims.create({
        key: 'birdFly',
        frames: this.anims.generateFrameNumbers('birdSprite', { start: 0, end: 9 }), // Frame 0-9
        frameRate: 10,
        repeat: -1
       });

      // Burung pertama
       const bird1 = this.add.sprite(100, 150, 'birdSprite').setScale(0.8); // Skala lebih kecil
        bird1.play('birdFly');

     // Tween untuk burung pertama
       this.tweens.add({
       targets: bird1,
       x: 1400, // Posisi akhir burung pertama
       y: 50, // Gerakan vertikal opsional
       duration: 8000, // Durasi pergerakan
       ease: 'Linear',
       repeat: -1, // Ulangi terus
       yoyo: false // Gerakan bolak-balik
      });

     // Burung kedua
      const bird2 = this.add.sprite(200, 300, 'birdSprite') .setScale(0.6); // Ukuran burung kedua berbeda
      bird2.play('birdFly');

     // Tween untuk burung kedua
     this.tweens.add({
     targets: bird2,
     x: 1600, // Posisi akhir burung kedua
     y: 100, // Gerakan vertikal opsional
     duration: 12000, // Durasi lebih lama dari burung pertama
     ease: 'Linear',
     repeat: -1, // Ulangi terus
     yoyo: false // Gerakan bolak-balik
     });

        // Tambahkan gambar judul dengan animasi masuk dari atas
        const title = this.add.image(625, -100, 'titleImage').setOrigin(0.5).setScale(1.0);
        this.tweens.add({
            targets: title,
            y: 150,
            duration: 1200,
            ease: 'Bounce.out',
            onComplete: () => {
                // Setelah masuk, tambahkan animasi mengambang
                this.tweens.add({
                    targets: title,
                    y: title.y - 15,
                    duration: 1500,
                    yoyo: true,
                    repeat: -1,
                    ease: 'Sine.inOut'
                });
            }
        });

        // Tambahkan tombol menu dengan efek fade in dan rotasi
        const menuButton = this.add.sprite(1180, 60, 'menuButton').setInteractive();
        menuButton.setScale(0.3); 

        // Efek hover untuk tombol menu
        menuButton.on('pointerover', () => {
            this.tweens.add({
                targets: menuButton,
                scale: 0.4, // Sedikit memperbesar
                duration: 200, // Animasi lebih cepat
                ease: 'Sine.inOut' // Efek lembut
            });
        });

        menuButton.on('pointerout', () => {
            this.tweens.add({
                targets: menuButton,
                scale: 0.3, // Kembali ke ukuran awal
                duration: 200,
                ease: 'Sine.inOut'
            });
        });

        // Animasi klik untuk tombol menu
        menuButton.on('pointerdown', () => {
            const klikSound = this.sound.add('klikplay'); // Gunakan efek suara tombol yang sudah dimuat
            klikSound.play();
            this.music.stop(); // Hentikan musik saat ini
            this.scene.start('CreditScene'); // Ganti scene 
        });

        // Tambahkan tombol Play dengan animasi
        const playButton = this.add.sprite(625, 355, 'playButton').setInteractive();
        playButton.setScale(0);
        playButton.setRotation(Phaser.Math.DegToRad(360));  // Menggunakan setRotation untuk rotasi

        // Animasi masuk untuk tombol play
        this.tweens.add({
            targets: playButton,
            scale: 0.5,
            rotation: 0,
            duration: 1000,
            delay: 500,
            ease: 'Back.out',
            onComplete: () => {
                // Setelah masuk, tambahkan animasi mengambang
                this.tweens.add({
                    targets: playButton,
                    y: playButton.y - 8,
                    duration: 1500,
                    yoyo: true,
                    repeat: -1,
                    ease: 'Sine.inOut'
                });
            }
        });

        // Efek hover yang lebih menarik
        playButton.on('pointerover', () => {
            this.tweens.add({
                targets: playButton,
                scale: 0.6,
                rotation: Phaser.Math.DegToRad(5),  
                duration: 300,
                ease: 'Back.out'
            });
        });

        playButton.on('pointerout', () => {
            this.tweens.add({
                targets: playButton,
                scale: 0.5,
                rotation: 0,
                duration: 300,
                ease: 'Back.out'
            });
        });

        // Klik tombol play
        playButton.on('pointerdown', () => {
            const klikSound = this.sound.add('klikplay');
            klikSound.play();
            this.music.stop();
            this.startLoading(); // Mulai proses loading
        });
    }

    startLoading() {
        // Tambahkan background loading dengan transparansi 
        const loadingBg = this.add.rectangle(
            this.scale.width / 2,
            this.scale.height / 2,
            this.scale.width,
            this.scale.height,
            0x000000,
            0.8 // Menambah opacity agar lebih gelap
        ).setOrigin(0.5);

        // Tambahkan teks loading
        const loadingText = this.add.text(
            this.scale.width / 2,
            this.scale.height / 2,
            'Loading...',
            {
                fontSize: '32px',
                fill: '#FFFFFF',
                fontStyle: 'bold'
            }
        ).setOrigin(0.5);

        // Tambahkan animasi berkedip pada teks loading
        this.tweens.add({
            targets: loadingText,
            alpha: 0,
            duration: 500,
            yoyo: true,
            repeat: -1, // Ulangi terus
        });

        // Delay untuk transisi ke GameScene
        this.time.delayedCall(1000, () => {
            loadingBg.destroy();
            loadingText.destroy();
            this.scene.start('GameScene');
        });
    }
}

class CreditScene extends Phaser.Scene {
    constructor() {
        super({ key: 'CreditScene' }); 
    }

    create() {
        const music = this.sound.add('menu', { loop: true, volume: 2.5 }); // Volume disesuaikan
        music.play(); // Mainkan musik
        // Tambahkan latar belakang 
        const bg = this.add.image(625, 370, 'background2').setScale(0.7);

        // Tambahkan gambar judul dengan animasi masuk dari atas
        const title = this.add.image(625, -100, 'image').setOrigin(0.5).setScale(0.7);
        this.tweens.add({
            targets: title,
            y: 150,
            duration: 1200,
            ease: 'Bounce.out',
            onComplete: () => {
                // Setelah masuk, tambahkan animasi mengambang
                this.tweens.add({
                    targets: title,
                    y: title.y - 15,
                    duration: 1500,
                    yoyo: true,
                    repeat: -1,
                    ease: 'Sine.inOut'
                });
            }
        });

        // Tambahkan daftar teks tentang aset
        const credits = [
            'assets Button: www.freepik.com',
            'assets Music: www.Pixabay.com',
            'background assets and text titles : www.canva.com',
            '(I made it using assets from the Canva application)',
            'Game created by: Nadiyah Julianty Andriani'
        ];

        credits.forEach((credit, index) => {
            this.add.text(this.scale.width / 2, 200 + index * 50, credit, {
                fontSize: '24px',
                fill: '#000000'
            }).setOrigin(0.5);
        });

        // Tambahkan tombol kembali ke MainScene
        const menuButton = this.add.sprite(100, 60, 'backButton').setInteractive();
        menuButton.setScale(0.3);

        // Pastikan sound sudah di-load di PreloadScene
        const klikSound = this.sound.add('klikplay'); 

        // Animasi hover untuk tombol menu
        menuButton.on('pointerover', () => {
            this.tweens.add({
                targets: menuButton,
                scale: 0.35, // Sedikit memperbesar
                duration: 200,
                ease: 'Sine.inOut'
            });
        });

        menuButton.on('pointerout', () => {
            this.tweens.add({
                targets: menuButton,
                scale: 0.3, // Kembali ke ukuran awal
                duration: 200,
                ease: 'Sine.inOut'
            });
        });

        // Animasi klik untuk tombol menu
        menuButton.on('pointerdown', () => {
            if (klikSound) klikSound.play(); // Mainkan suara klik
            this.tweens.add({
                targets: menuButton,
                scale: 0.25, // Sedikit mengecil saat diklik
                duration: 100,
                ease: 'Sine.inOut',
                yoyo: true, // Kembali ke ukuran semula
                onComplete: () => {
                    music.stop();
                    this.scene.start('MainScene'); // Pindah ke MainScene
                }
            });
        });
    }
}

// Variabel global untuk skor dan high score
let skorGlobal = 0; // Skor saat ini
let highScoreGlobal = parseInt(localStorage.getItem('highScore')) || 0; // High Score dari localStorage

class GameScene extends Phaser.Scene {
    constructor() {
        super('GameScene');
    }

    create() {
        this.music = this.sound.add('musikgame2', { loop: true, volume: 1.5 });
        this.music.play();

        const bg = this.add.image(1250 / 2, 570 / 2, 'background2').setScale(0.66, 0.6);

        this.skor = skorGlobal;
        this.highScore = highScoreGlobal;

        this.skorText = this.add.text(20, 20, `Skor: ${this.skor}`, { fontSize: '24px', fill: '#000' });
        this.highScoreText = this.add.text(20, 50, `High Score: ${this.highScore}`, { fontSize: '24px', fill: '#000' });

        this.timeLeft = 10;
        this.timerText = this.add.text(this.scale.width - 150, 20, `Waktu: ${this.timeLeft}`, { fontSize: '24px', fill: '#000' });

        this.timeEvent = this.time.addEvent({
            delay: 1000,
            callback: () => {
                this.timeLeft--;
                this.timerText.setText(`Waktu: ${this.timeLeft}`);
                if (this.timeLeft <= 0) {
                    this.gameOver();
                }
            },
            callbackScope: this,
            loop: true
        });

        // Array warna dasar dan sulit
        this.warnaDasar = ['Merah', 'Biru', 'Hijau', 'Kuning', 'Ungu'];
        this.warnaSulit = ['Merah Muda', 'Merah Tua', 'Oren', 'Biru Muda', 'Hijau Tua']; 
        this.warnaAktif = [...this.warnaDasar]; // Warna awal hanya warna dasar
        
        this.warnaHex = {
            'Merah': 0xff0000,
            'Biru': 0x0000ff,
            'Hijau': 0x00ff00,
            'Kuning': 0xffff00,
            'Ungu': 0x800080,
            'Merah Muda': 0xffaaaa,
            'Merah Tua': 0xaa0000,
            'Oren': 0xff8c00, 
            'Biru Muda': 0xaaaaff,
            'Hijau Tua': 0x005500
        };
        

        this.benarBerturut = 0; // Counter untuk jawaban benar berturut-turut
        this.rows = 2; // Jumlah baris tombol warna 
        this.createColorButtons();
    }

    createColorButtons() {
        this.warnaBenar = Phaser.Utils.Array.GetRandom(this.warnaAktif);

        let warnaTeks = Phaser.Utils.Array.GetRandom(this.warnaAktif);
        while (warnaTeks === this.warnaBenar) {
            warnaTeks = Phaser.Utils.Array.GetRandom(this.warnaAktif);
        }

        if (this.instruksiWarna) {
            this.instruksiWarna.destroy();
        }

        this.instruksiWarna = this.add.text(this.scale.width / 2, 100, `Pilih bola berwarna: ${this.warnaBenar}`, {
            fontSize: '28px',
            fill: this.convertColorToHexString(this.warnaHex[warnaTeks])
        }).setOrigin(0.5);

        if (this.tombolWarnaGroup) {
            this.tombolWarnaGroup.clear(true, true);
        }

        this.tombolWarnaGroup = this.add.group();

        const cols = Math.ceil(this.warnaAktif.length / this.rows); // Hitung jumlah kolom
        const buttonSize = 100; // Ukuran tombol
        const spacing = 20; // Jarak antar tombol
        const totalWidth = cols * buttonSize + (cols - 1) * spacing; // Lebar total grid
        const startX = (this.scale.width - totalWidth) / 2 + buttonSize / 2; // Posisi awal X
        const startY = 250; // Posisi awal Y

        let index = 0;
        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < cols; col++) {
                if (index >= this.warnaAktif.length) break;

                const warna = this.warnaAktif[index];
                const x = startX + col * (buttonSize + spacing);
                const y = startY + row * (buttonSize + spacing);

                const button = this.add.ellipse(x, y, buttonSize, buttonSize, this.warnaHex[warna])
                    .setInteractive()
                    .on('pointerdown', () => {
                        this.handleColorClick(warna, button);
                    });

                this.tweens.add({
                    targets: button,
                    x: `+=10`,
                    y: `+=5`,
                    duration: Phaser.Math.Between(800, 1000),
                    yoyo: true,
                    repeat: -1,
                    ease: 'Sine.easeInOut'
                });

                this.tombolWarnaGroup.add(button);
                index++;
            }
        }
    }

    handleColorClick(warna, button) {
        if (warna === this.warnaBenar) {
            console.log('Warna benar dipilih');
            this.sound.play('YES'); // Mainkan suara benar
            this.skor += 10; // Tambahkan skor
            skorGlobal = this.skor; // Perbarui skor global
            this.benarBerturut++; // Tambah jawaban benar berturut-turut
            this.skorText.setText(`Skor: ${this.skor}`);
            this.timeLeft += 3; // Tambahkan 3 detik waktu
            if (this.timeLeft > 10) this.timeLeft = 10; // Batasi waktu maksimum ke 10 detik
    
            // Animasi tombol benar
            this.tweens.add({
                targets: button,
                scaleX: 1.2,
                scaleY: 1.2,
                duration: 100,
                yoyo: true,
                ease: 'Power1'
            });
    
            // Tambahkan warna baru dari warna sulit setiap 5 jawaban benar berturut-turut
            if (this.benarBerturut % 5 === 0 && this.warnaSulit.length > 0) {
                const warnaBaru = this.warnaSulit.shift(); // Ambil warna pertama dari warnaSulit
                this.warnaAktif.push(warnaBaru); // Tambahkan ke warna aktif
                console.log(`Warna baru ditambahkan: ${warnaBaru}`);
            }
    
            // Acak ulang warna aktif
            Phaser.Utils.Array.Shuffle(this.warnaAktif);
    
            // Hancurkan tombol lama dan buat tombol baru
            this.createColorButtons();
        } else {
            this.sound.play('NO'); // Mainkan suara salah
            this.benarBerturut = 0; // Reset jawaban benar berturut-turut jika salah
            this.skor -= 10; // Kurangi skor 10 poin
            if (this.skor < 0) this.skor = 0; // Jangan biarkan skor di bawah 0
            this.skorText.setText(`Skor: ${this.skor}`);
            this.timeLeft -= 2; // Penalti waktu
            if (this.timeLeft < 0) this.timeLeft = 0;
            this.timerText.setText(`Waktu: ${this.timeLeft}`);

            // Animasi tombol salah
            this.tweens.add({
                targets: button,
                x: `+=10`,
                duration: 50,
                yoyo: true,
                repeat: 4,
                ease: 'Linear',
                onComplete: () => {
                    button.x -= 10;
                }
            });
        }
    }    

    gameOver() {
        // Hentikan musik dan timer
        this.music.stop();
        this.timeEvent.remove();
    
        // Tambahkan background Game Over
        const bgGameOver = this.add.rectangle(
            this.scale.width / 2, 
            this.scale.height / 2, 
            700, // Lebar background
            550, // Tinggi background
            0x000000, // Warna hitam
            0.8 // Transparansi
        ).setOrigin(0.5);
    
        // Tambahkan image untuk teks "Game Over"
        const gameOverText = this.add.image(this.scale.width /2, this.scale.height / 2 - 150, 'gameoverButton');
        gameOverText.setScale(0.7); // Sesuaikan skala
    
        // Tombol Play Again (image)
        const playAgainButton = this.add.image(this.scale.width /2 + 100, this.scale.height / 2 + 70, 'restartButton').setInteractive();
        playAgainButton.setScale(0.4); // Sesuaikan skala tombol
    
        // Tambahkan animasi hover untuk tombol restart
        playAgainButton.on('pointerover', () => {
            this.tweens.add({
                targets: playAgainButton,
                scale: 0.45,
                duration: 200,
                ease: 'Sine.inOut'
            });
        });
    
        playAgainButton.on('pointerout', () => {
            this.tweens.add({
                targets: playAgainButton,
                scale: 0.4,
                duration: 200,
                ease: 'Sine.inOut'
            });
        });
    
        // Event klik tombol restart
        playAgainButton.on('pointerdown', () => {
            this.sound.play('klikplay'); // Mainkan suara klik
            this.resetGame(); // Panggil metode resetGame untuk restart
        });
    
        // Tombol pindah scene 
        const mainMenuButton = this.add.image(this.scale.width /2 - 100, this.scale.height / 2 + 70, 'homeButton').setInteractive();
        mainMenuButton.setScale(0.4); // Sesuaikan skala tombol
    
        // Animasi hover untuk tombol Main Menu
        mainMenuButton.on('pointerover', () => {
            this.tweens.add({
                targets: mainMenuButton,
                scale: 0.45,
                duration: 200,
                ease: 'Sine.inOut'
            });
        });
    
        mainMenuButton.on('pointerout', () => {
            this.tweens.add({
                targets: mainMenuButton,
                scale: 0.4,
                duration: 200,
                ease: 'Sine.inOut'
            });
        });
    
        // Event klik tombol Main Menu
        mainMenuButton.on('pointerdown', () => {
            this.sound.play('klikplay'); // Mainkan suara klik
            this.scene.start('MainScene'); // Ganti scene ke Main Menu
        });
    
        // Tambahkan teks "Waktu Habis"
        this.add.text(
            this.scale.width / 2, 
            this.scale.height / 2 - 40, 
            'Waktu Habis!', 
            {
                font: '24px Arial',
                fill: '#ffffff',
                align: 'center'
            }
        ).setOrigin(0.5);
    
        // Cek dan update high score
        if (this.skor > highScoreGlobal) {
            highScoreGlobal = this.skor;
            localStorage.setItem('highScore', highScoreGlobal); // Simpan high score baru
        }
    
        // Menambahkan teks score dan high score di game over screen
        // Menampilkan skor saat ini
        this.add.text(
            this.scale.width / 2, 
            this.scale.height / 1 - 100, 
            'Skor Anda: ' + this.skor, 
            {
                font: '24px Arial',
                fill: '#ffffff',
                align: 'center'
            }
        ).setOrigin(0.5);
    
        // Menampilkan high score
        this.add.text(
            this.scale.width / 2, 
            this.scale.height / 1 - 70, 
            'High Score: ' + highScoreGlobal, 
            {
                font: '24px Arial',
                fill: '#ffffff',
                align: 'center'
            }
        ).setOrigin(0.5);
    }
         
    resetGame() {
        // Reset skor dan waktu
        this.skor = 0;
        skorGlobal = 0;
        this.timeLeft = 10;
    
        // Reset teks skor dan waktu
        this.skorText.setText(`Skor: ${this.skor}`);
        this.timerText.setText(`Waktu: ${this.timeLeft}`);
        this.highScoreText.setText(`High Score: ${this.highScore}`); // Pastikan high score juga tampil
    
        // Hapus semua elemen termasuk background yang lama
        this.children.removeAll(true);  // Menghapus semua objek di scene, termasuk background
    
        // Tambahkan background baru (background utama)
        const bg = this.add.image(1250 / 2, 570 / 2, 'background').setScale(0.66, 0.6).setDepth(-1);
    
        // Tambahkan animasi fade-in untuk background
        bg.alpha = 0;
        this.tweens.add({
            targets: bg,
            alpha: 1,
            duration: 1000,
            ease: 'Power2'
        });
    
        // Putar kembali musik
        this.music.play(); // Putar musik lagi setelah restart
    
        // Reset warna aktif dan counter
        this.warnaAktif = [...this.warnaDasar];
        this.benarBerturut = 0;
    
        // Buat ulang tombol warna
        this.createColorButtons();
    
        // Tambahkan kembali teks skor, high score, dan timer (dengan posisi yang sesuai)
        this.skorText = this.add.text(20, 20, `Skor: ${this.skor}`, { fontSize: '24px', fill: '#000' });
        this.highScoreText = this.add.text(20, 50, `High Score: ${this.highScore}`, { fontSize: '24px', fill: '#000' });
        this.timerText = this.add.text(this.scale.width - 150, 20, `Waktu: ${this.timeLeft}`, { fontSize: '24px', fill: '#000' });
    
        // Mulai ulang timer
        this.timeEvent = this.time.addEvent({
            delay: 1000,
            callback: () => {
                this.timeLeft--;
                this.timerText.setText(`Waktu: ${this.timeLeft}`);
                if (this.timeLeft <= 0) {
                    this.gameOver();
                }
            },
            callbackScope: this,
            loop: true
        });
    }          

    convertColorToHexString(color) {
        return `#${color.toString(16).padStart(6, '0')}`;
    }
}

const config = {
    type: Phaser.AUTO,
    width: 1250,
    height: 570,
    scene: [MainScene, CreditScene, GameScene] // Urutan scene 
};

const game = new Phaser.Game(config);
