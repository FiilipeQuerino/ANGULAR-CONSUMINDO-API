import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MusicServiceTsService } from './services/music.service.ts.service';
import { Music } from './models/music.model';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ANGULAR-CONSUMINDO-API';

  musicas$ = new Observable<Music[]>();

  // Form
  id = '';
  musica = '';
  autor = '';

  constructor(private musicService: MusicServiceTsService) {
    this.obterMusicasCadastradas();
  }

  obterMusicasCadastradas() {    
      this.musicas$ = this.musicService.obterMusicas();
  }

  buttoClick() {
    if (!this.musica || !this.autor)
      return

    if (this.id) {
      this.atualizar();
      return
    } 

    this.musicService.cadastrarMusica({ author: this.autor, text: this.musica})
      .subscribe(() => this.obterMusicasCadastradas())
  }

  atualizar() {
    this.musicService.editarMusica({
      id: parseInt(this.id), 
      author: this.autor,
      text: this.musica
    })
     .subscribe(() => this.obterMusicasCadastradas());
  }

  preencherCampos(musica: Music) {
    this.id = musica.id!.toString();
    this.musica = musica.text;   
    this.autor = musica.author
  }

  remover(id: number) {
    this.musicService.removerMusica(id)
      .subscribe(() => this.obterMusicasCadastradas());
  }
}
