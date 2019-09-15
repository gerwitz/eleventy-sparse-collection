module.exports = function(config) {
    config.addCollection("numbers", function(collection) {
        numberfiles = collection.getFilteredByTag('numberfiles');

        var emptyNumbers = new Map();
        for (var i = 0; i <= 9; i++) {
            emptyNumbers.set(i, {
                fileSlug: i.toString(),
                url: '/numbers/'+i+'/',
                templateContent: 'This is a manufactured number: '+i
            });
        }

        var allNumbers = numberfiles.reduce(function(map, item) {
            // without this, we get a URL with "false" in it
            // but if it matches the correct URL, we get a `DuplicatePermalinkOutputError` over a collusion with the paginated/singular page
            item.url = item.filePathStem + '/.';
            map.set(1*item.fileSlug, item);
            return map;
        }, emptyNumbers);

        return Array.from(allNumbers.values());
    });

    return {
        dir: {
            input: "src",
            layouts: "_layouts",
            output: "_site"
        }
    }
}
