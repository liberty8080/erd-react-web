import G6 from "@antv/g6";
import {getLabelPosition} from "@antv/g6/es/util/graphic";

G6.registerEdge('relation', {
    draw(cfg, group) { //cfg,配置项 group:边的容器
        const startPoint = cfg.startPoint;
        const endPoint = cfg.endPoint;

        let keyShape = group.addShape('path', {
            attrs: {
                path: [['M', startPoint.x, startPoint.y],
                    ['L', endPoint.x, endPoint.y]],
                stroke: '#660006', //边的颜色
                lineWidth: 2,       //边的宽度
                lineAppendWidth: 4       //边响应鼠标的检测宽度,提升击中范围
            } //实体间的边
        });
        let center = keyShape.getPoint(0.5);
        let shapeContainer = group.addGroup();

        //菱形
        shapeContainer.addShape('path', {
            attrs: {
                path: [['M', center.x - 40, center.y], ['L', center.x, center.y - 20], ['L', center.x + 40, center.y], ['L', center.x, center.y + 20], ['Z']],
                fill: '#fff',
                stroke: '#666'
            }
        });

        //关系描述
        shapeContainer.addShape('text', {
            attrs: {
                text: cfg.relation,
                x: center.x,
                y: center.y,
                textAlign: 'center',
                textBaseline: 'middle',
                fill: '#666'
            }
        });
        let point = getLabelPosition(keyShape, 0, 40, 7, true);
        //起点数字
        group.addShape('text', {
            attrs: {
                text: cfg.sourceEntity, //sourceEntity在data里定义
                x: point.x,
                y: point.y,
                rotate: point.rotate,
                fill: '#000966'
            }
        });

        point = getLabelPosition(keyShape, 1, -40, 7, true);
        group.addShape('text', {
            attrs: {
                text: cfg.targetEntity,
                x: point.x,
                y: point.y,
                rotate: point.rotate,
                fill: '#888'
            }
        });
        return keyShape;
    }
});
