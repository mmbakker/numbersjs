function insertExample(id, numbers, config)
{
    var newNode,
        formatter       = new MB.NumberFormatter(config),
        i               = 0,
        n               = numbers.length,
        domNodeTemplate = document.getElementById('rowTemplate-' + id),
        domTarget       = document.getElementById('target-' + id);

    showConfig(id, config);

    domNodeTemplate.parentNode.removeChild(domNodeTemplate);
    domNodeTemplate.id = '';

    for (; i < n; i++) {
        newNode = domNodeTemplate.cloneNode(true);

        newNode.getElementsByTagName('td')[0].innerHTML = numbers[i];
        newNode.getElementsByTagName('td')[1].firstChild.innerHTML = formatter.format(numbers[i]);

        domTarget.appendChild(newNode);
    }
}

function showConfig(id, config)
{
    var key,
        output    = '{'
        domTarget = document.getElementById('config-' + id);

    for (key in config) {
        output += "\n" + '    ' + key + ': ' + getConfigValue(config[key]) + ',';
    }

    output  = output.substr(0, output.length - 1);
    output += "\n" + '}';

    domTarget.innerHTML = output;
}

function getConfigValue(value)
{
    return typeof value === 'string' ? "'" + value + "'" : value;
}