import Button from 'mintflow/Button';

export default function SaveButtons(loading) {
  return (
    <div className="my-2 divide-y divide-base-200">
      <Button loading={loading} type="submit">
        Save Settings
      </Button>
    </div>
  );
}
