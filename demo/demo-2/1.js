var data = [
    {
        id: 1,
        name: '花花市',
        parent_id: 0
    },
    {
        id: 2,
        name: '背背市',
        parent_id: 0
    },
    {
        id: 3,
        name: '花花县',
        parent_id: 1,
    },
    {
        id: 4,
        name: '花一县',
        parent_id: 1,
    },
    {
        id: 5,
        name: '花二县',
        parent_id: 1,
    },
    {
        id: 6,
        name: '背背县',
        parent_id: 2,
    },
    {
        id: 7,
        name: '背一县',
        parent_id: 2,
    },
    {
        id: 8,
        name: '背二县',
        parent_id: 2,
    },
    {
        id: 9,
        name: '花村',
        parent_id: 3,
    },
    {
        id: 10,
        name: '发村',
        parent_id: 3,
    },
    {
        id: 11,
        name: '哈村',
        parent_id: 3,
    },
    {
        id: 12,
        name: '背背村',
        parent_id: 6,
    },
    {
        id: 13,
        name: '佩佩村',
        parent_id: 6,
    },
    {
        id: 14,
        name: '嘿嘿村',
        parent_id: 6,
    },
];

var wrapper = document.querySelector('wrapper');

render()

function render(prarent_id, children_el) {


    /*如果有子级元素，先清空子级内容*/
    if (children_el)
        children_el.innerHTML = '';

    /*如果是默认选项直接返回*/
    if (parent_id === '')
        return;

    /*父级id默认为0*/
    parent_id = parseInt(parent_id) || 0;

    /*通过传入的父级id过滤得到新的数据*/
    var list = data.filter(function (location) {
        return parent_id === location.parent_id;
    });

    /*如果新数据不存在（也就是没有子级）*/
    if (!list.length)
        return;

    /*创建当前层级以下的总容器（可参考Demo中的HTML结构）*/
    var el = document.createElement('span');
    el.innerHTML = `
<select></select>
<span class="children"></span>
`;

    var select = el.querySelector('select');
    var children = el.querySelector('.children');

    /*设置默认项*/
    var default_option = document.createElement('option');
    default_option.innerText = '- 请选择 -';
    default_option.value = '';
    select.appendChild(default_option);

    /*迭代之前过滤后的新数据*/
    list.forEach(function (location) {
        var option = document.createElement('option');
        option.innerHTML = location.name;
        option.value = location.id;
        select.appendChild(option);
    });

    /*如果是最顶级（没有父级id）*/
    if (!parent_id) {
        /*将生成的元素添加到#wrapper中*/
        document.querySelector('#wrapper').appendChild(el);
    } else {
        /*否则将生成的元素添加到子级的.children元素下*/
        if (children_el)
            children_el.appendChild(el);
    }

    /*当选项发生变化时，渲染子级选项*/
    select.addEventListener('change', function () {
        render(this.value, children);
    });
}

