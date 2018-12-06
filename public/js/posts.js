$('.vote-button').click(function (e) {
    e.preventDefault();

    var $button = $(this);
    var url = $button.attr('href');

    $.ajax({
        type: 'PUT',
        url,
        success: function (data) {
            console.log('Successfully voted to', url)
            $button.addClass('voted');
        },
        error: function (err) {
            console.log('Failed to vote to', url);
            alert('Vote failed!');
        }
    });
});
