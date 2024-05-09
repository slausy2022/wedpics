import { EmojiService } from './../services/emoji.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-emoji-picker',
  templateUrl: './emoji-picker.component.html',
  styleUrls: ['./emoji-picker.component.scss'],
})
export class EmojiPickerComponent {

  constructor(private emojiService: EmojiService) { }


  // Fonction appelée lorsqu'un emoji est sélectionné
  onEmojiClick(event: any) {
    const emoji = event.emoji.native; // Récupère l'emoji sélectionné
    console.log('Emoji sélectionné : ', emoji);
    this.emojiService.updateDescription(emoji);
  }

}
