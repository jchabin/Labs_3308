echo "File name?"
read fileName
if test -f "$fileName"; then
	run=true
	while $run; do
		echo "0: count_lines()"
		echo "1: count_words()"
		echo "2: add_text()"
		echo "3: copy_and_exit()"
		read choice
		case $choice in
			0)
				num=$(grep -c ^ $fileName)
				echo "There are $num lines."
				;;
			1)
				grep --color=always -E "Lorem|model|Ipsum|will" $fileName
				num=$(grep -o -E "Lorem|model|Ipsum|will" $fileName | grep -c ^)
				echo "There are $num matching words."
				;;
			2)
				echo "What would you like to add to the file?"
				read inpText
				echo -n -e "\n$inpText" >> $fileName
				cat $fileName
				echo -e "\n"
				;;
			3)
				mkdir -p solution
				> "solution/$fileName"
				cp $fileName "solution/$fileName"
				run=false
				echo "Copying file and exiting..."
				;;
		esac
	done
else
	echo "Error, file not found."
fi