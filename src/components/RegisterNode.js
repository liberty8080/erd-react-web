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

G6.registerNode('property', {
    options: {
        style: {
            stroke: "#72CC4A",
            fill: '#6fd4ff'
        },
        size: [80, 40]
    }
}, 'ellipse');

G6.registerNode('classRect', {
    draw(cfg, group) {
        console.info("draw");
        return group.addShape('rect', {
            attrs: {
                attrs: {
                    fill: 'red',
                    shadowOffsetX: 10,
                    shadowOffsetY: 10,
                    shadowColor: 'blue',
                    shadowBlur: 10,
                    opacity: 0.8
                }
            }
        })
    }
});

