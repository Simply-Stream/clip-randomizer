import './App.css'
import React from 'react'
import { TwitchRandomClips, TwitchRandomClipsConfig } from '@simply-stream/react-components';

function App() {
    const [config, setConfig] = React.useState<TwitchRandomClipsConfig & { standalone: boolean }>();

    React.useEffect(() => {
        const configDataElement = document.getElementById('config-data');
        if (configDataElement && configDataElement.textContent) {
            setConfig(JSON.parse(configDataElement.textContent));
        }
    }, []);
    return (
        <>
            {/* This is stupid, but for now a more or less ok-ish workaround ... */}
            <span
                className="inline animate-spin text-gray-200 fill-blue-600 dark:text-gray-600 w-16 h-16 absolute top-1/2 left-1/2 hidden"/>
            {config && <TwitchRandomClips standalone={config.standalone ?? true} config={config}/>}
        </>
    )
}

export default App
