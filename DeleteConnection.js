function Node(nodeId) {
    this.name = nodeId;
    this.connectedNodes = [];
    this.status = "unvisited";
    this.findConnectedNode = function (nodeId) {
        var intIndex;

        if (this.connectedNodes.length == 0)
            return -1;
        for (intIndex = 0; intIndex < this.connectedNodes.length; intIndex++) {
            if (this.connectedNodes[intIndex].toLowerCase() == nodeId.toLowerCase()) {
                return intIndex;
            }
        }

        return -1;
    }
    this.addConnectedNode = function (nodeId) {
        if (this.findConnectedNode(nodeId) == -1)
            this.connectedNodes.push(nodeId);
    }
    this.removeConnectedNode = function (nodeId) {
        var intIndex;
        var nodeIndex = this.findConnectedNode(nodeId);
        if (nodeIndex >= 0) {
            var old = this.connectedNodes;
            this.connectedNodes = old.splice(0, nodeIndex);
            if (nodeIndex < old.length - 1)
            {
                for (intIndex = nodeIndex+1; intIndex < old.length; intIndex++)
                    this.connectedNodes.push(old[intIndex]);
            }
        }

        return;
    }
}

function DirectedGraph() {
    this.root = "";
    this.nodes = [];
    this.initGraph = function (graphData) {
        var objRst;
        var intIndex;

        objRst = this.validateData(graphData);
        if (!objRst.ErrMsg == "") {
            objRst.isValid = false;
            objRst.ErrMsg = "Please provide data with valid format.";
            return objRst;
        }

        if (typeof (graphData.root) !== "undefined")
            this.root = graphData.root;
        if (typeof (graphData.nodes) !== "undefined") {
            for (intIndex = 0; intIndex < graphData.nodes.length; intIndex++) {
                var newNode = new Node(graphData.nodes[intIndex].id);
                this.addNode(newNode);
            }
        }
        if (typeof (graphData.edges) !== "undefined") {

            for (intIndex = 0; intIndex < graphData.edges.length; intIndex++) {
                this.addEdge(graphData.edges[intIndex]);
            }
        }
    };
    this.validateData = function (graphData) {
        var objRst = {};
        var bValid = true;
        var Err = "";
        var Temp;

        if (!graphData) {
            objRst.isValid = false;
            objRst.ErrMsg = "Please provide components.";
            return objRst;
        }

        if (typeof (graphData.root) == "undefined") {
            objRst.isValid = false;
            if (typeof (graphData.root) == "undefined") {
                objRst.isValid = false;
                objRst.ErrMsg = "Please provide root information.";
                return objRst;
            }
        }

        if (typeof(graphData.nodes) == "undefined") {
            objRst.isValid = false;
            objRst.ErrMsg = "Please provide nodes information.";
            return objRst;
        }

        if (typeof(graphData.edges) == "undefined") {
            objRst.isValid = false;
            objRst.ErrMsg = "Please provide edges information.";
            return objRst;
        }

        objRst.isValid = true;
        objRst.ErrMsg = "";
        return objRst;
    }
    this.findNode = function (nodeId) {
        var intIndex;
        if(this.nodes.length == 0)
            return -1;
        for (intIndex = 0; intIndex < this.nodes.length; intIndex++)
        {
            if (this.nodes[intIndex].name.toLowerCase() == nodeId.toLowerCase())
            {
                return intIndex;
            }
        }

        return -1;
    }
    this.addNode = function (node)
    {
        if(this.nodes.length == 0)
        {
            this.nodes.push(node);
        }
        else
        {
            var nodeIndex = this.findNode(node.name);
            if(nodeIndex == -1)
                this.nodes.push(node);
        }

        return;
    }
    this.addEdge = function (edge)
    {
        var fromNode = edge.from;
        var toNode = edge.to;
        var fromIndex = this.findNode(fromNode);
        if(fromIndex >= 0){
            this.nodes[fromIndex].addConnectedNode(toNode);
        }
    }
    this.removeEdge = function (edge)
    {
        var fromNode = edge.from;
        var toNode = edge.to;
        var fromIndex = this.findNode(fromNode);
        if (fromIndex >= 0) {
            this.nodes[fromIndex].removeConnectedNode(toNode);
        }
    }
    this.updateStatus = function (nodeName, strStatus) {
        var nIndex = this.findNode(nodeName);
        if (nIndex >= 0) {
            this.nodes[nIndex].status = strStatus;
        }
    }
    this.searchPath = function (fromNodeName, toNodeName)
    {
        var intIndex;
        var bFind = false;
        var q = [];

        this.updateStatus(fromNodeName, "visiting");
        q.push(fromNodeName);
        var temp;
        while (q.length > 0)
        {
            temp = q[0];
            q = q.slice(1,q.length);
            var nIndex = this.findNode(temp);
            var tempNode = this.nodes[nIndex];
            for (intIndex = 0; intIndex < tempNode.connectedNodes.length; intIndex++) {
                nIndex = this.findNode(tempNode.connectedNodes[intIndex]);
                var connectNode = this.nodes[nIndex];
                if (connectNode.status == "unvisited")
                {
                    if (connectNode.name == toNodeName) {
                        return true;
                    }
                    else {
                        this.updateStatus(connectNode.name, "visiting");
                        q.push(connectNode.name);
                    }
                }
            }
            this.updateStatus(temp, "visited");
        }
        return false;
    }
    this.delConnection = function (edge) {
        var intIndex;
        var objRst = {};
        objRst.ErrMsg = "";
        objRst.deleteNodes = [];

        this.removeEdge(edge);
        for (intIndex = 0; intIndex < this.nodes.length; intIndex++)
        {
            if (this.nodes[intIndex].name.toLowerCase() != this.root.toLowerCase())
            {
                if (!this.searchPath(this.nodes[intIndex].name, this.root))
                { objRst.deleteNodes.push(this.nodes[intIndex].name); }
            }
        }

        return objRst;
    }
}




