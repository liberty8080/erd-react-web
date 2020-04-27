import G6 from "@antv/g6"

G6.registerNode('entity', {
        options: {
            style: {
                stroke: "#72CC4A",
                fill: '#6fd4ff'
            },
            size: [60, 40]
        }
    },
    'rect');

G6.registerNode('property',{
    options:{
        style:{
            stroke:"#72CC4A",
            fill:'#6fd4ff'
        },
        size:[80,40]
    }
},'ellipse');

