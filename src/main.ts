import 'zone.js/dist/zone';
import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { bootstrapApplication } from '@angular/platform-browser';
import { Lieu } from './Lieu';

@Component({
  selector: 'my-app',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  readonly log = signal<object>({});
  readonly index = signal<number>(0);
  readonly lieux = signal<readonly Lieu[]>([
    {
      temperature: 27,
      photoURL:
        'https://www.10wallpaper.com/wallpaper/1366x768/1712/Waterfall_river_flow_forest_moss_rocks_4K_HD_Photo_1366x768.jpg',
    },
    {
      temperature: -32,
      photoURL:
        'https://www.10wallpaper.com/wallpaper/1366x768/1712/Winter_misty_snow_mountains_sunrise_4K_HD_Photo_1366x768.jpg',
    },
    {
      temperature: 12,
      photoURL:
        'https://www.10wallpaper.com/wallpaper/1366x768/1712/Canada_colorful_niagara_falls_4K_HD_Photo_1366x768.jpg',
    },
    {
      temperature: 5,
      photoURL:
        'https://www.10wallpaper.com/wallpaper/1366x768/1712/Norway_lofoten_islands_mountains_4K_HD_Photo_1366x768.jpg',
    },
    {
      temperature: 34,
      photoURL:
        'https://www.10wallpaper.com/wallpaper/1366x768/1712/Dreamy_sailboat_ocean_sunset_4K_HD_Photo_1366x768.jpg',
    },
  ]);

  // à faire : définir un signal calculé lieuActuel qui renvoie, à partir des signaux index et lieux, le lieu d'indice index dans lieux.

  // readonly lieuActuel = computed<Lieu>( () => ({ temperature: lieux()[index()].temperature, photoURL: lieux()[index()].photoURL }) ); // percobaan 1
  // readonly lieuActuel = computed<Lieu>( () => this.lieux()[index()]) // percobaan 2
  /*
  readonly lieuActuel = computed<Lieu>( () => (
    const num = index();
    const tempat = this.lieux();
    {
      temperature: tempat[num].temperature,
      photoUrl: tempat[num].photoURL,
    }
  )); // percobaan 3
  /*
    Dari 3 percobaan diatas, niatnya itu 
    Percobaan 1: Mau mengafektasi atribut-atribut Lieu secara langsung. Jadi ngambil sebuah tempat dari signal lieux berdasarkan signal index, kemudian atribut-atribut dari tempat yang sudah terpilih tersebut diafektasi ke atribut-atribut lieuActuel ( lieux()[index()].temperature ).
    ---- Berdasarkan Percobaan 1 yang tidak berhasil(ada error), jadi gua pikir langsung balikkin sebuah tempat aja. Itulah Percobaan 2. ----
    Percobaan 2: Mau ngembaliin sebuah tempat yang telah dipilih dari signal lieux berdasarkan signal index ( this.lieux()[index()] ).
    ---- Percobaan 2 pun engga berhasil(ada error), jadi gua pikir kayanya engga bisa kalo langsung 'bersentuhan' dengan signal nya. Maksudnya engga bisa langsung mengakses/mengambil suatu tempat dari signal lieux ( lieux()[index()] ). Makanya gua coba ambil dulu nilai dari signal lieux dan signal index. Itulah Percobaan 3. ----
    Percobaan 3: Mau ambil dulu nilai dari signal-signal, kemudian diafektasi ke atribut-atribut nya.
    ---- Percobaan 3 masih engga berhasil(ada error). Akhirnya liat punya orang yang ngerjain. Ternyata percobaan 1 tuh bener (secara logika) cuman harus ditambahin this buat mempresisikan kalo itu sebuah instance di class ini. ----
  */

  /*
  // ini punya osman
  readonly lieuActuel = computed<Lieu>(() => {
    const idx = this.index();
    const listLieux = this.lieux(); // kenapa kalo tipenya dibikin Lieu[] jadi error?

    return listLieux[idx];
  });
  */

  /*
  // ini punya lawriw
  readonly lieuActuel = computed<Lieu>(() => ({
    temperature: this.lieux()[this.index()].temperature,
    photoURL: this.lieux()[this.index()].photoURL,
  }));
  */

  /*
  readonly lieuActuel = computed<Lieu>(() => ({
    temperature: this.lieux()[this.index()].temperature,
    photoURL: this.lieux()[this.index()].photoURL,
  }));
  */

  readonly lieuActuel = computed<Lieu>(() => this.lieux()[this.index()]);

  /**
   * Tire au sort un indice entre 0 et le nombre de lieux à voir.
   * Affecte cet indice au signal index.
   */
  voyagevoyage(): void {
    const nbAle = Math.floor(Math.random() * this.lieux().length);
    this.index.set(nbAle);
    //this.index=signal<number>(signalIndex); // GABISA PAKE INI, karena ini akan mengganti referensi dari index. Padahal index bertipe readonly, jadi engga compatible.

    // this.index.set(Math.floor(Math.random() * this.lieux().length));
    // this.log.set({ temperature: this.lieuActuel().temperature,
    //                photoURL: this.lieuActuel().photoURL });
  }
}

// un signal calculé SAMA DENGAN un signal dérivé

bootstrapApplication(AppComponent);
