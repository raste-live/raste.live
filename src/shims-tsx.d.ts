import Vue, { VNode } from 'vue'

declare global {
  namespace JSX {
    // tslint:disable no-empty-interface
    interface Element extends VNode {}
    // tslint:disable no-empty-interface
    interface ElementClass extends Vue {}
    interface IntrinsicElements {
      [elem: string]: any;
    }
  }

  interface SongMetadata {
    is_stream_offline: boolean;
    title: string;
    artist: string;
    played_at: string;
    query: string;
    listeners: number;
  }
}
