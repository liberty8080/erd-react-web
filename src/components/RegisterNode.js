//todo：添加属性节点样式与实体节点样式
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

