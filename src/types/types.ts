export type StackTypes = {
  Home: undefined;
  Camera: undefined;
  Settings: undefined;
  navigate: any;
};

export type PhotoType = {
  path: string;
};

export type ImagePrevPropTypes = {
  source: string;
  location: CoordsType | null;
  time: string;
};
export type CoordsType = {
  coords: {
    accuracy: string;
    latitude: string;
    longitude: string;
  };
};
export type GesturePropTypes = {
  startX: number;
  startY: number;
};
export type EventType = {
    nativeEvent : LayoutType
}

type LayoutType = {
    layout: {
        width: string,
        height: string
    }
}

export type GetLocationProps = {
  setLocation?: (location : any) => void;
  highAccuracy: boolean;
  forceLocation: boolean;
  useLocationManager: boolean;
  locationDialog: boolean;
};