import { Component, OnInit, ViewChildren } from '@angular/core';


@Component({
  selector: 'app-jamedia-radio',
  templateUrl: './jamedia-radio.component.html',
  styleUrls: ['./jamedia-radio.component.css']
})
export class JamediaRadioComponent implements OnInit {

  private trackselected = null;
  private audioplayer = null;
  private volumen = 0.05;
  private buttonplay = null;
  private volwidget = null;

  constructor() { }

  ngOnInit() {
    this.audioplayer = document.getElementById('audioplayer');
    this.buttonplay = document.getElementById('btnplay');
    this.volwidget = document.getElementById('volwidget');

    this.resizeAll();
    window.addEventListener('resize', this.resizeAll);
  }

  resizeAll() {
    const w = window.innerWidth;
    const h = window.innerHeight;
    const jamedia = document.getElementById('jamedia');
    jamedia.style.maxWidth = w - 20 + 'px';
    jamedia.style.maxHeight = h - 20 + 'px';
  }

  select_item(item) {
    if (this.trackselected != null) {
      this.trackselected.classList.remove('playing');
    }
    this.trackselected = item;
    this.trackselected.classList.add('playing');
    this.load_and_play(
      this.trackselected.children[1].innerHTML,
      this.trackselected.getAttribute('data'));
  }

  load_and_play(name, url) {
    this.audioplayer.src = url + '?nocache=' + new Date().getTime();
    this.audioplayer.volume = this.volumen;
    this.audioplayer.play();
    if (this.volwidget.value !== this.volumen * 100) {
      this.volwidget.value = this.volumen * 100;
    }
    const legend = document.getElementById('player_legend');
    legend.innerHTML = name;
  }

  setvolumen(event) {
    this.volumen = event.target.value / 100;
    this.audioplayer.volume = this.volumen;
  }

  pause_play() {
    if (this.audioplayer.paused || this.audioplayer.ready) {
      this.audioplayer.play();
    } else {
      this.audioplayer.pause();
    }
  }

  inplay(event) {
    const span = this.buttonplay.children[0];
    span.classList.remove('fa-play');
    span.classList.add('fa-pause');
  }

  inpause(event) {
    const span = this.buttonplay.children[0];
    span.classList.remove('fa-pause');
    span.classList.add('fa-play');
  }
}
