export interface ThemeInterface {
  background: {
      video: any,
      color: string
  },
  icon: string
}

export interface ThemeMappingInterface {
  [key: string]: {
    day: ThemeInterface,
    night: ThemeInterface
  }
}

export const Themes: ThemeMappingInterface = {
  rain: {
    day: {
      background: {
        video: () => require('@/assets/weather/conditions/videos/rain.mp4'),
        color: 'rgba(0, 91, 234, 0.2)'
      },
      icon: 'weather-rainy'
    },
    night: {
      background: {
        video: () => require('@/assets/weather/conditions/videos/rain.mp4'),
        color: 'rgba(0, 0, 0, 0.6)'
      },
      icon: 'weather-rainy'
    }
  },
  clear: {
    day: {
      background: {
        video: () => require('@/assets/weather/conditions/videos/clear.mp4'),
        color: 'rgba(247, 183, 51, 0.2)'
      },
      icon: 'weather-sunny'
    },
    night: {
      background: {
        video: () => require('@/assets/weather/conditions/videos/clear.mp4'),
        color: 'rgba(0, 0, 0, 0.6)'
      },
      icon: 'weather-night'
    }
  },
  thunderstorm: {
    day: {
      background: {
        video: () => require('@/assets/weather/conditions/videos/thunderstorm.mp4'),
        color: 'rgba(97, 97, 97, 0.2)'
      },
      icon: 'weather-lightning'
    },
    night: {
      background: {
        video: () => require('@/assets/weather/conditions/videos/thunderstorm.mp4'),
        color: 'rgba(0, 0, 0, 0.6)'
      },
      icon: 'weather-lightning'
    }
  },
  clouds: {
    day: {
      background: {
        video: () => require('@/assets/weather/conditions/videos/clouds.mp4'),
        color: 'rgba(31, 28, 44, 0.2)'
      },
      icon: 'weather-cloudy'
    },
    night: {
      background: {
        video: () => require('@/assets/weather/conditions/videos/clouds.mp4'),
        color: 'rgba(0, 0, 0, 0.6)'
      },
      icon: 'weather-cloudy'
    }
  },
  snow: {
    day: {
      background: {
        video: () => require('@/assets/weather/conditions/videos/snow.mp4'),
        color: 'rgba(0, 210, 255, 0.2)'
      },
      icon: 'weather-snowy'
    },
    night: {
      background: {
        video: () => require('@/assets/weather/conditions/videos/snow.mp4'),
        color: 'rgba(0, 0, 0, 0.6)'
      },
      icon: 'weather-snowy'
    }
  },
  drizzle: {
    day: {
      background: {
        video: () => require('@/assets/weather/conditions/videos/drizzle.mp4'),
        color: 'rgba(7, 101, 133, 0.2)'
      },
      icon: 'weather-hail'
    },
    night: {
      background: {
        video: () => require('@/assets/weather/conditions/videos/drizzle.mp4'),
        color: 'rgba(0, 0, 0, 0.6)'
      },
      icon: 'weather-hail'
    }
  },
  haze: {
    day: {
      background: {
        video: () => require('@/assets/weather/conditions/videos/haze.mp4'),
        color: 'rgba(102, 166, 255, 0.2)'
      },
      icon: 'weather-hail'
    },
    night: {
      background: {
        video: () => require('@/assets/weather/conditions/videos/haze.mp4'),
        color: 'rgba(0, 0, 0, 0.6)'
      },
      icon: 'weather-hail'
    }
  },
  mist: {
    day: {
      background: {
        video: () => require('@/assets/weather/conditions/videos/haze.mp4'),
        color: 'rgba(60, 211, 173, 0.2)'
      },
      icon: 'weather-fog'
    },
    night: {
      background: {
        video: () => require('@/assets/weather/conditions/videos/haze.mp4'),
        color: 'rgba(0, 0, 0, 0.6)'
      },
      icon: 'weather-fog'
    }
  }
}
