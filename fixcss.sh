cp -fr node_modules/3box-profile-edit-react/lib/styles ./vendor
cp -fr node_modules/emoji-mart/css/emoji-mart.css ./vendor/styles

find ./node_modules/3box-profile-edit-react/lib/Edit.js -type f -exec sed -i 's/require("emoji-mart/\/\/ import/g' {} \;

find ./node_modules/3box-profile-edit-react/lib/Edit.js -type f -exec sed -i 's/require(".\/styles.*//g' {} \;
find ./node_modules/3box-profile-edit-react/lib/index.js -type f -exec sed -i 's/require(".\/styles.*//g' {} \;