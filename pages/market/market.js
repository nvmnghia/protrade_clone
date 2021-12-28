// VN30 list
const VN30 = [
    'ACB', 'BID', 'BVH', 'CTG', 'FPT', 'GAS',
    'GVR', 'HDB', 'HPG', 'KDH', 'MBB', 'MSN',
    'MWG', 'NVL', 'PDR', 'PLX', 'PNJ', 'POW',
    'SAB', 'SSI', 'STB', 'TCB', 'TPB', 'VCB',
    'VHM', 'VIC', 'VJC', 'VNM', 'VPB', 'VRE'
];

// Chart colors
const RED   = '#B83935';
const GREEN = '#5AB55C';

function generate_data() {
    const VN30_CONTRIB = Array.from({ length: VN30.length },
        () => Math.floor(Math.random() * 50 - 25));

    const get_color = context => {
        const value = VN30_CONTRIB[context.dataIndex];
        return value > 0 ? GREEN : RED;
    }

    return {
        labels: VN30,
        datasets: [
            {
                data: VN30_CONTRIB,
                backgroundColor: get_color
            }
        ]
    }
}

window.onload = () => {
    new Chart(document.getElementById('market'),
        {
            type: 'bar',
            data: generate_data(),
            options: {}
        }
    );
}