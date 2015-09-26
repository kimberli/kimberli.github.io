$(document).ready(function() {
		
		$('#calendar').fullCalendar({
			header: {
				left: 'prev,next today',
				center: 'title',
				right: 'month,basicWeek,basicDay'
			},
			weekends: false, 
			defaultDate: Date(),
			height: 'auto',
			editable: true,
			eventLimit: true, // allow "more" link when too many events
			events: [
				{
					title: 'All Day Event',
					start: '2015-09-01'
				},
				{
					title: 'Long Event',
					start: '2015-09-07',
					end: '2015-09-10'
				},
				{
					id: 999,
					title: 'Repeating Event',
					start: '2015-09-09T16:00:00'
				},
				{
					id: 999,
					title: 'Repeating Event',
					start: '2015-09-16T16:00:00'
				},
				{
					title: 'Conference',
					start: '2015-09-11',
					end: '2015-09-13'
				},
				{
					title: 'Meeting',
					start: '2015-09-12T10:30:00',
					end: '2015-09-12T12:30:00'
				},
				{
					title: 'Lunch',
					start: '2015-09-12T12:00:00'
				},
				{
					title: 'Meeting',
					start: '2015-09-12T14:30:00'
				},
				{
					title: 'Happy Hour',
					start: '2015-09-12T17:30:00'
				},
				{
					title: 'Dinner',
					start: '2015-09-12T20:00:00'
				},
				{
					title: 'Birthday Party',
					start: '2015-09-13T07:00:00'
				},
				{
					title: 'Click for Google',
					url: 'http://google.com/',
					start: '2015-09-28'
				}
			]
		});
		
	});