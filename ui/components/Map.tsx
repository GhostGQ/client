'use client';

import {
    YMap,
    YMapComponentsProvider,
    YMapDefaultFeaturesLayer,
    YMapDefaultMarker,
    YMapDefaultSchemeLayer,
    YMapListener,
    YMapMarker
} from "@/ymap3-components/dist";
import React, {useState} from "react";
import {YMapLocation} from "@yandex/ymaps3-types/imperative/YMap";

const Map = () => {
    const [location, setLocation] = useState<YMapLocation>({center: [66.908382, 39.680103], zoom: 16});

    const onUpdate = React.useCallback(({location, mapInAction}: any) => {
        if (!mapInAction) {
            setLocation({
                center: location.center,
                zoom: location.zoom,
            });
        }
    }, []);
    //34081406-1ec3-48f4-83ef-9fd4a1f048da

    return (
        <div className='w-full h-[450px]'>
            <YMapComponentsProvider
                apiKey='34081406-1ec3-48f4-83ef-9fd4a1f048da'
                lang="ru_RU"
                reuseLoadPromise={true}
            >
                <YMap
                    location={location}
                    mode="vector"
                    theme="dark"
                >
                    <YMapDefaultSchemeLayer/>
                    <YMapDefaultFeaturesLayer/>
                    <YMapMarker coordinates={location.center}/>
                    <YMapDefaultMarker coordinates={location.center}/>
                    <YMapListener onUpdate={onUpdate}/>
                </YMap>
            </YMapComponentsProvider>
        </div>
    )
}

export default Map;
