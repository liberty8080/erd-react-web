export const data = {
    nodes: [
        {
            id: 'customer',
            label: 'customer',
            x: 200,
            y: 200,
            type: 'entity'

        }, {
            id: 'customer_id',
            label: 'customer_id',
            x: 120,
            y: 160,
            type: 'ellipse',
            size: [80, 40]
        }, {
            id: 'name',
            label: 'name',
            x: 140,
            y: 100,
            type: 'ellipse',
            size: [80, 40]
        }, {
            id: 'address',
            label: 'address',
            x: 180,
            y: 60,
            type: 'ellipse',
            size: [80, 40]
        }, {
            id: 'email',
            label: 'email',
            x: 240,
            y: 110,
            type: 'ellipse',
            size: [80, 40]
        }, {
            id: 'order',
            label: 'order',
            x: 400,
            y: 200,
            type: 'rect',
            size: [60, 40]
        }, {
            id: 'order_id',
            label: 'order_id',
            x: 320,
            y: 130,
            type: 'ellipse',
            size: [80, 40]
        }, {
            id: 'order_status',
            label: 'order_status',
            x: 380,
            y: 80,
            type: 'ellipse',
            size: [80, 40]
        }, {
            id: 'total_price',
            label: 'total_price',
            x: 440,
            y: 150,
            type: 'ellipse',
            size: [80, 40]
        }, {
            id: 'employee',
            label: 'employee',
            x: 380,
            y: 380,
            type: 'rect',
            size: [60, 40]
        }, {
            id: 'employee_id',
            label: 'employee_id',
            x: 320,
            y: 440,
            type: 'ellipse',
            size: [80, 40]
        }, {
            id: 'title',
            label: 'title',
            x: 440,
            y: 440,
            type: 'ellipse',
            size: [80, 40]
        }],
    edges: [{
        id: 'c_id',
        source: 'customer',
        target: 'customer_id'
    }, {
        id: 'c_name',
        source: 'customer',
        target: 'name'
    }, {
        id: 'c_address',
        source: 'customer',
        target: 'address'
    }, {
        id: 'c_email',
        source: 'customer',
        target: 'email'
    }, {
        id: 'o_id',
        source: 'order',
        target: 'order_id'

    }, {
        id: 'o_price',
        source: 'order',
        target: 'total_price'
    }, {
        id: 'o_status',
        source: 'order',
        target: 'order_status'
    }, {
        id: 'c_o',
        source: 'customer',
        target: 'order',
        relation: 'places',
        sourceEntity: '1',
        targetEntity: 'N',
        type: 'relation'
    }, {
        id: 'o_e',
        source: 'employee',
        target: 'order',
        relation: 'finalize',
        sourceEntity: '1',
        targetEntity: 'N',
        type: 'relation'
    }, {
        id: 'e_id',
        source: 'employee',
        target: 'employee_id'
    }, {
        id: 'e_title',
        source: 'employee',
        target: 'title'
    }]
};
