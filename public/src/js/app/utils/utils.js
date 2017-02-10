NShop.run(function ($rootScope, $location) {

    /**
     * String format.
     */
    if (!String.prototype.format) {
        String.prototype.format = function () {
            var str = this.toString();
            if (!arguments.length) return str;

            var args = typeof arguments[0],
                args = (('string' == args || 'number' == args) ? arguments : arguments[0]);

            for (arg in args) {
                str = str.replace(RegExp('\\{' + arg + '\\}', 'gi'), args[arg]);
            }
            return str;
        }
    }

    window.ObjUtils = function() {};

    ObjUtils.clone = function (obj) {
        return JSON.parse(JSON.stringify(obj));
    };

    ObjUtils.isEqualObjects = function (obj1, obj2, omitProps) {
        var obj1Clone = ObjUtils.clone(obj1);
        var obj2Clone = ObjUtils.clone(obj2);

        var omitPropsLength;
        if (omitProps && (omitPropsLength = omitProps.length)) {
            for (var i = 0; i < omitPropsLength; i++) {
                delete obj1Clone[ omitProps[i] ];
                delete obj2Clone[ omitProps[i] ];
            }
        }

        if (JSON.stringify(obj1Clone) === JSON.stringify(obj2Clone)) {
            return true;
        }

        for (var key in obj1Clone) {
            if (obj1Clone.hasOwnProperty(key) && obj1Clone[key] === obj2Clone[key]) {
                return false;
            }
        }
        return true;
    };
});