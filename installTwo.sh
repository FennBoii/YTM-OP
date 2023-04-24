# The files to be installed into the user's home directory.
INSTALL_FILES=$(
	# Remove comments.
	egrep -v '^#' < .installignore \
		`# Remove empty lines.` \
		| grep -v ^$ \
		`# Process into a find arguments.` \
		| sed -r 's/^(.*)$/! -path '\''*\/\1'\'' ! -path '\''*\/\1\/*'\''/' \
		`# Run find to get us a list of every file to install.` \
		| xargs find . -type f
)

printf 'Files to be installed:\n%s\n' "$INSTALL_FILES"
